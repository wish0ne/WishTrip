import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import img1 from "../../assets/images/여행사진1.jpg";
import img2 from "../../assets/images/여행사진2.jpg";
import img3 from "../../assets/images/여행사진3.jpg";
import post from "../../assets/images/AR포스트.png";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";
import { ReactComponent as Close } from "../../assets/images/uil_multiply.svg";

const entities = [
  {
    id: 1,
    latitude: 37.240832,
    longitude: 127.0775808,
    image: post,
  },
  {
    id: 2,
    latitude: 37.250832,
    longitude: 127.0975808,
    image: img2,
  },
  {
    id: 3,
    latitude: 34.890422,
    longitude: 128.638861,
    image: img3,
  },
  {
    id: 4,
    latitude: 34.892422,
    longitude: 128.640861,
    image: img1,
  },
];

const posts = [
  {
    id: 1,
    image: img1,
    body: "아직 휴가 못 가신 분~~!\n진짜 휴가는 지금부터~! 신나는 페스티벌이 기다리고 있어요 🎷\n라인업만 봐도 심장이 두근대는데요..\n마지막 여름 휴가 계획 중이시던 분들,\n이번 기회에 전주 여행도 함께 묶어서 JUMF 즐기고 오는 건 어떠신지요!\n티켓 무료 증정 이벤트도 진행 중이라니까 참여해보세요!\n❗️이벤트는 이 게시글이 아닌 JUMF 계정 @2022_jumf 팔로워 이벤트 게시물에서 참여하셔야 정상 접수 됩니다! (해당 계정에 이벤트 참여 게시글 고정되어 있어요)",
    emotions: [{ surprise: 312, heart: 12, funny: 1 }],
    tags: ["부산", "치킨", "햄버거", "도미노피자"],
    user_img: img3,
    user_nickname: "부끄러운 프로도",
    date: "2022.08.02",
    comments: [
      {
        user_img: img1,
        nickname: "신난 어피치",
        date: "2022.08.02",
        body: "여기 진짜 좋아요",
      },
    ],
  },
  {
    id: 2,
    image: img2,
    body: "여기는 꼭 다시 와야지~",
    emotions: [{ sad: 21, good: 12, funny: 1 }],
    tags: ["부산", "치킨", "햄버거", "도미노피자"],
    user_img: img1,
    user_nickname: "부끄러운 라이언",
    date: "2022.07.02",
    comments: [
      {
        user_img: img1,
        nickname: "신난 어피치",
        date: "2022.07.22",
        body: "저도 가보고 싶어요!",
      },
    ],
  },
];

const ARContainer = styled.div`
  height: 100%;
  a-scene {
    height: 100%;
    width: 100%;
  }
`;

const BackButton = styled(Link)`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 2.4rem;
  background-color: rgba(255, 255, 255, 0.75);
  position: fixed;
  top: 6rem;
  left: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Add = styled(Link)`
  height: 5.2rem;
  background-color: rgba(255, 255, 255, 0.75);
  position: fixed;
  bottom: 5.8rem;
  width: 15.4rem;
  border-radius: 3.2rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  & span {
    font-family: "SemiBold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.primary3};
    margin-left: 0.92rem;
  }
`;

const Modal = styled.div`
  background-color: purple;
  height: 0;
  position: fixed;
  bottom: 0;
  border-radius: 3.2rem 3.2rem 0 0;
  left: 0;
  right: 0;
  z-index: 3;
  &.half {
    height: 50%;
  }
  &.full {
    height: 100%;
  }
`;

function Ar() {
  const arjsStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  useEffect(() => {
    //alert("테스트 14");
    if (navigator.geolocation) {
      console.log("GPS 사용 가능");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(
            position.coords.latitude + " " + position.coords.longitude,
          );
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      alert("GPS를 지원하지 않습니다.");
    }

    return () => {
      let html = document.querySelector("html");
      let body = document.querySelector("body");
      let video = document.querySelector("video");
      if (video) body.removeChild(video);
      // body.style = "";
      html.classList.remove("a-fullscreen");
    };
  }, []);

  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    setTouchPosition({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };

  const handleTouchEnd = (e) => {
    //const distanceX = e.changedTouches[0].pageX - touchPosition.x;
    const distanceY = touchPosition.y - e.changedTouches[0].pageY;
    console.log(distanceY);
    const modal = document.querySelector(".modal");

    //위로 슬라이드
    if (distanceY > 50) {
      modal.classList.remove("half");
      modal.classList.add("full");
    }

    //아래로 슬라이드
    else if (distanceY < 50) {
      if (modal.classList.contains("half")) {
        modal.classList.remove("half");
      } else {
        modal.classList.remove("full");
        modal.classList.add("half");
      }
    }
  };

  const handleClose = () => {
    console.log("close");
    const modal = document.querySelector(".modal");
    modal.classList.remove("half");
    modal.classList.remove("full");
  };

  return (
    <>
      {arjsStatus === "ready" && lookatStatus === "ready" && (
        <ARContainer>
          {/* <a-scene
            debug
            cursor="rayOrigin: mouse;"
            raycaster="objects: .raycastable"
            vr-mode-ui="enabled: false"
            // embedded
            arjs="sourceType: webcam; sourceWidth:1080; sourceHeight:764; displayWidth: 1080; displayHeight: 764; debugUIEnabled: false; "

            //vr-mode-ui="enabled: false"
            //arjs="sourceType: webcam; debugUIEnabled: false;"
            //videoTexture:true;
          >
            <a-assets>
              {entities.map((entity) => (
                <img
                  id={entity.id}
                  src={entity.image}
                  alt="ar post"
                  key={entity.id}
                />
              ))}
            </a-assets>
            <a-camera gps-camera="" rotation-reader=""></a-camera>
            {entities.map((entity) => (
              <a-image
                gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude};`}
                class="raycastable"
                clickhandler={entity.id}
                key={entity.id}
                src={`#${entity.id}`}
                look-at="[gps-camera]"
                scale="10 10 10"
              ></a-image>
            ))}
            <a-image
              position="0 2 -3"
              src="#4"
              class="raycastable"
              clickhandler={10}
              look-at="[gps-camera]"
            ></a-image>
          </a-scene> */}
          <BackButton to="/WishTrip">
            <Back width="3.2rem" height="3.2rem" />
          </BackButton>
          <Add to="Create">
            <Camera />
            <span>포스트 남기기</span>
          </Add>
          <Modal
            className="modal half"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Close width="2.4rem" height="2.4rem" onClick={handleClose} />
            {/* <img src={posts[0].image} alt="AR 포스트 사진" /> */}
          </Modal>
        </ARContainer>
      )}
    </>
  );
}

export default Ar;
