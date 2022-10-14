import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";
import Modal from "./components/Modal";
import { arContents, arCreatePost, arId } from "../../recoil/ar";
import instance from "../../modules/api";
import { commentsState, postState } from "../../recoil/post";

const ARContainer = styled.div`
  height: 100%;
  position: relative;
  a-scene {
    height: 100%;
    width: 100%;
  }
`;

const PC = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.palette.inversed2};
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-family: "ExtraBold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default1};
  }
`;

const BackButton = styled(Link)`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 2.4rem;
  background-color: rgba(255, 255, 255, 0.75);
  position: absolute;
  top: 6rem;
  left: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Add = styled.div`
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
  padding: 1.5rem;
  & span {
    font-family: "SemiBold";
    font-size: 1.6rem;
    line-height: 1.6rem;
    color: ${(props) => props.theme.palette.primary3};
    margin-left: 0.92rem;
  }
`;

const isMobile = /Mobi/i.test(window.navigator.userAgent); // 모바일 체크

function Ar() {
  const [arCreate, setARCreate] = useRecoilState(arCreatePost); //ar 포스트 작성에 필요한 정보
  const [contents, setContents] = useRecoilState(arContents); //ar 포스트
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 }); //유저 위치 정보
  const [ar_id, setArId] = useRecoilState(arId); //ar 포스트 id
  const navigate = useNavigate();
  const nftStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  useEffect(() => {
    console.log(window.navigator.userAgent);
    if (!isMobile) alert("AR 여행 기능은 모바일에서만 이용 가능합니다.");
    //get user coordinate
    getPosition();
  }, []);

  useEffect(() => {
    if (isMobile) {
      //get ar post
      instance
        .get("/msw/arpost/get_around_posts", {
          x: coords.x,
          y: coords.y,
          z: 0,
        })
        .then((res) => {
          setContents(res.data);
        });

      return () => {
        let html = document.querySelector("html");
        let body = document.querySelector("body");
        let video = document.querySelector("video");
        if (video) body.removeChild(video);
        html.classList.remove("a-fullscreen");
      };
    }
  }, [coords]);

  //유저 좌표 -> 대표 좌표 변환
  const hash = (coords) => {
    console.log(coords);
    return {
      x: coords.latitude ? coords.latitude.toFixed(6) : 0,
      y: coords.longitude ? coords.longitude.toFixed(6) : 0,
      z: coords.altitude ? coords.altitude.toFixed(6) : 0,
    };
  };

  //위치 정보 받기 동기처리
  const getCoords = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject);
    });
  };

  const getPosition = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCoords(coords);
        },
        (error) => {
          alert(error.message);
        },
      );
      // await getCoords().then(({ coords }) => {
      //   console.log(coords);
      //   setCoords({
      //     x: coords.latitude,
      //     y: coords.longitude,
      //     z: coords.altitude,
      //   });
      // });
    } else {
      alert("GPS를 지원하지 않습니다.");
    }
  }, []);

  const handleAddClick = () => {
    //AR 작성 전 유저 위치 정보 받기
    setARCreate({
      ...arCreate,
      x_value: coords.x,
      y_value: coords.y,
      z_value: coords.z,
    });
    navigate("./Create");
  };

  const [post, setPost] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentsState);

  useEffect(() => {
    if (ar_id) {
      //글 정보 받아오기
      instance
        .get(`msw/post/read/?id=${ar_id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          throw err;
        });

      //댓글 정보 받아오기
      instance
        .get(`msw/post/read/comments?id=${ar_id}`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [ar_id, setComments, setPost]);

  return (
    <ARContainer>
      {!isMobile ? (
        <PC>
          <span>AR여행은 모바일에서 이용가능합니다. •́︿•̀ ｡</span>
        </PC>
      ) : (
        lookatStatus === "ready" &&
        nftStatus === "ready" &&
        contents.length > 0 && (
          <a-scene
            debug
            cursor="rayOrigin: mouse;"
            raycaster="objects: .raycastable"
            vr-mode-ui="enabled: false"
            //embedded
            arjs="sourceType: webcam; sourceWidth:1080; sourceHeight:764; displayWidth: 1080; displayHeight: 764; debugUIEnabled: false; videoTexture:true;"
            //arjs="sourceType: webcam; debugUIEnabled: false; videoTexture:true;"
            //renderer="antialias: true; alpha: true"
          >
            <a-assets>
              {contents.map((entity) => (
                <img
                  id={entity.ar_post_id}
                  src={entity.image}
                  alt="ar contents"
                  key={entity.ar_post_id}
                />
              ))}
            </a-assets>
            <a-camera gps-camera="" rotation-reader=""></a-camera>
            {contents.map((entity) => (
              <a-image
                gps-entity-place={`latitude: ${entity.x_value}; longitude: ${entity.y_value};`}
                class="raycastable"
                clickhandler={entity.ar_post_id}
                key={entity.ar_post_id}
                src={`#${entity.ar_post_id}`}
                look-at="[gps-camera]"
                position={`0 ${entity.z_value} 0`}
              ></a-image>
            ))}
          </a-scene>
        )
      )}
      <BackButton to="../Home">
        <Back width="3.2rem" height="3.2rem" />
      </BackButton>
      <Add onClick={handleAddClick}>
        <Camera width="2.8rem" height="2.8rem" />
        <span>포스트 남기기</span>
      </Add>
      {post && <Modal />}
    </ARContainer>
  );
}

export default Ar;
