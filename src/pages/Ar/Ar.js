import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";
import Modal from "./components/Modal";
import { arContents, arCreatePost } from "../../recoil/ar";
import instance from "../../modules/api";

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

function Ar() {
  const [arCreate, setARCreate] = useRecoilState(arCreatePost); //ar 포스트 작성에 필요한 정보
  const [contents, setContents] = useRecoilState(arContents); //ar 포스트
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 }); //유저 위치 정보

  const navigate = useNavigate();
  const nftStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  useEffect(() => {
    //get user coordinate
    getPosition();

    //get ar post
    instance
      .post("/msw/arpost/get_around_posts", {
        x_value: coords.x,
        y_value: coords.y,
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
  }, [coords]);

  //위치 정보 받기 동기처리
  const getCoords = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject);
    });
  };

  const getPosition = async () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        ({ coords }) => {
          console.log(coords);
          setCoords({
            x: coords.latitude,
            y: coords.longitude,
            z: coords.altitude,
          });
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
  };

  const handleAddClick = () => {
    //AR 작성 전 유저 위치 정보 받기
    setARCreate({
      ...arCreate,
      x_value: coords.x,
      y_value: coords.y,
      z_value: coords.z,
    });
  };

  return (
    <>
      {lookatStatus === "ready" && nftStatus === "ready" && (
        <ARContainer>
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
                  id={entity.id}
                  src={entity.image}
                  alt="ar contents"
                  key={entity.id}
                />
              ))}
            </a-assets>
            <a-camera gps-camera="" rotation-reader=""></a-camera>
            {contents.map((entity) => (
              <a-image
                gps-entity-place={`latitude: ${entity.x_value}; longitude: ${entity.y_value};`}
                class="raycastable"
                clickhandler={entity.id}
                key={entity.id}
                src={`#${entity.id}`}
                look-at="[gps-camera]"
                scale="10 10 10"
                position={`0 ${entity.z_value} 0`}
              ></a-image>
            ))}
          </a-scene>
          <BackButton to="../Home">
            <Back width="3.2rem" height="3.2rem" />
          </BackButton>
          <Add onClick={handleAddClick}>
            <Camera />
            <span>포스트 남기기</span>
          </Add>
          {/* <Modal id={id} /> */}
        </ARContainer>
      )}
    </>
  );
}

export default Ar;
