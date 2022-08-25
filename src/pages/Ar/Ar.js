import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";
import Modal from "./components/Modal";
import { arPosts } from "../../recoil/ar";

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

function Ar() {
  const arjsStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );
  const locationStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js",
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
      html.classList.remove("a-fullscreen");
    };
  }, []);

  const posts = useRecoilValue(arPosts);

  return (
    <>
      {arjsStatus === "ready" &&
        lookatStatus === "ready" &&
        locationStatus === "ready" && (
          <ARContainer>
            <a-scene
              debug
              cursor="rayOrigin: mouse;"
              raycaster="objects: .raycastable"
              vr-mode-ui="enabled: false"
              // embedded
              arjs="sourceType: webcam; sourceWidth:1080; sourceHeight:764; displayWidth: 1080; displayHeight: 764; debugUIEnabled: false; videoTexture:true;"
              //arjs="sourceType: webcam; debugUIEnabled: false;"
              //videoTexture:true;
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
              {posts.map((entity) => (
                <a-image
                  gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude};`}
                  class="raycastable"
                  clickhandler={entity.id}
                  key={entity.id}
                  src={`#${entity.id}`}
                  //look-at="[gps-camera]"
                  scale="90 90 90"
                  position={entity.position ? entity.position : "0 0 0"}
                ></a-image>
              ))}
              {/* <a-image
              position="0 2 -3"
              src="#4"
              class="raycastable"
              clickhandler={10}
              look-at="[gps-camera]"
            ></a-image> */}
            </a-scene>
            <BackButton to="/Home">
              <Back width="3.2rem" height="3.2rem" />
            </BackButton>
            <Add to="Create">
              <Camera />
              <span>포스트 남기기</span>
            </Add>
            <Modal />
          </ARContainer>
        )}
    </>
  );
}

export default Ar;
