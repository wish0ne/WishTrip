import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";
import Modal from "./components/Modal";
import { arPosts, arCreatePost } from "../../recoil/ar";

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
  const [arCreate, setARCreate] = useRecoilState(arCreatePost);
  const navigate = useNavigate();
  const nftStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  useEffect(() => {
    return () => {
      let html = document.querySelector("html");
      let body = document.querySelector("body");
      let video = document.querySelector("video");
      if (video) body.removeChild(video);
      html.classList.remove("a-fullscreen");
    };
  }, []);

  const [id, setId] = useState(0);
  useEffect(() => {
    window.addEventListener("storage", () => {
      let id = localStorage.getItem("arId");
      if (id === null) setId(0);
      else setId(parseInt(id));
    });
  }, []);

  const posts = useRecoilValue(arPosts);

  //위치 정보 받기 동기처리
  const getCoords = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleAddClick = async () => {
    //AR 작성 전 유저 위치 정보 받기
    if (navigator.geolocation) {
      await getCoords()
        .then(({ coords }) => {
          console.log(coords);
          setARCreate({
            ...arCreate,
            x_value: coords.latitude || 0,
            y_value: coords.longitude || 0,
            z_value: coords.altitude || 0,
          });
        })
        .finally(() => {
          navigate("./Create");
        });
    } else {
      alert("GPS를 지원하지 않습니다.");
    }
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
              {posts.map((entity) => (
                <img
                  id={entity.id}
                  src={entity.image}
                  alt="ar post"
                  key={entity.id}
                />
              ))}
            </a-assets>
            <a-camera gps-camera="" rotation-reader=""></a-camera>
            <a-box
              gps-entity-place="latitude:34.888089; longitude:128.646070;"
              look-at="[gps-camera]"
              scale="20 20 20"
              color="red"
            ></a-box>
            {posts.map((entity) => (
              <a-image
                gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude};`}
                class="raycastable"
                clickhandler={entity.id}
                key={entity.id}
                src={`#${entity.id}`}
                look-at="[gps-camera]"
                scale="10 10 10"
                position={entity.position ? entity.position : "0 0 0"}
              ></a-image>
            ))}
          </a-scene>
          <BackButton to="/Home">
            <Back width="3.2rem" height="3.2rem" />
          </BackButton>
          <Add onClick={handleAddClick}>
            <Camera />
            <span>포스트 남기기</span>
          </Add>
          <Modal id={id} />
        </ARContainer>
      )}
    </>
  );
}

export default Ar;
