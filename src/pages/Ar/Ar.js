import * as AFRAME from "aframe";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScript from "../../modules/useScript.ts";
import img1 from "../../assets/images/여행사진1.jpg";
import img2 from "../../assets/images/여행사진2.jpg";
import img3 from "../../assets/images/여행사진3.jpg";
import { ReactComponent as Back } from "../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera-plus.svg";

const entities = [
  {
    id: 1,
    latitude: 34.891004,
    longitude: 128.639782,
    image: img1,
    tags: ["부산", "해운대", "부산에서제일맛있는곳"],
    emotions: [
      { type: "heart", value: 4324 },
      { type: "cry", value: 32 },
    ],
  },
  {
    id: 2,
    latitude: 34.891469,
    longitude: 128.638849,
    image: img2,
    tags: ["부산", "해운대"],
    emotions: [{ type: "good", value: 4324 }],
  },
  {
    id: 3,
    latitude: 34.890422,
    longitude: 128.638861,
    image: img3,
    tags: ["부산"],
    emotions: [{ type: "cry", value: 32 }],
  },
];

const ARContainer = styled.div`
  height: 100%;
  a-image {
    border: solid 0.1rem white;
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

  const [loading, setLoading] = useState(false);

  const initialising = () => {
    AFRAME.registerComponent("image", {
      init: function () {
        let el = this.el;
        el.addEventListener("click", () => {
          el.setAttribute("color", "red");
        });
      },
    });
  };

  useEffect(() => {
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

    if (!loading) {
      initialising();
      setLoading(true);
    }
    // window.addEventListener("gps-camera-update-position", (e) => {
    //   alert("camera position update");
    //   console.log(e);
    // });

    return () => {
      let html = document.querySelector("html");
      let body = document.querySelector("body");
      let video = document.querySelector("video");
      body.removeChild(video);
      body.style = "";
      html.classList.remove("a-fullscreen");
    };
  }, []);

  return (
    <>
      {arjsStatus === "ready" && lookatStatus === "ready" && (
        <ARContainer>
          <a-scene
            debug
            cursor="rayOrigin: mouse; fuse: true;"
            raycaster="objects: .raycastable"
            vr-mode-ui="enabled: false"
            //embedded
            arjs="sourceType: webcam; sourceWidth:1080; sourceHeight:764; displayWidth: 1080; displayHeight: 764; debugUIEnabled: false;"
            //embedded
            //vr-mode-ui="enabled: false"
            //arjs="sourceType: webcam; debugUIEnabled: false;"
            //debug
            //videoTexture:true;
          >
            <a-camera gps-camera="" rotation-reader=""></a-camera>
            <a-box position="2 -4 2" color="#ffffff" image />
            <a-image position="0 0 0" src={img1} scale="10 10 10" image />

            {/* {entities.map((entity) => {
              return (
                <a-box
                  gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude}`}
                  material={"color: blue"}
                  scale="10 10 10"
                  key={entity.id}
                  eventbox
                ></a-box>
              );
            })} */}
            <a-assets>
              {entities.map((entity) => (
                <img id={entity.id} src={entity.image} alt="ar post" />
              ))}
              <a-mixin
                id="frame"
                geometry="primitive: plane; width: 0.5; height: 0.5"
                material="color: white; shader: flat"
                animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: click"
                animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
              ></a-mixin>
              <a-mixin
                id="poster"
                geometry="primitive: plane; width: 0.47; height: 0.47"
                material="color: white; shader: flat"
                position="0 0 0.015"
              ></a-mixin>
              <a-mixin
                id="movieImage"
                geometry="primitive: plane; width: 1.5; height: 0.81"
                material="src: #ponyo; shader: flat; transparent: true"
                position="0 0.495 0.002"
              ></a-mixin>
            </a-assets>

            <a-entity
              position="0 1.6 0"
              camera
              look-controls="magicWindowTrackingEnabled: false; touchEnabled: false; mouseEnabled: false"
            >
              <a-entity
                id="fadeBackground"
                geometry="primitive: sphere; radius: 2.5"
                material="color: black; side: back; shader: flat; transparent: true; opacity: 0.6"
                visible="false"
              ></a-entity>
            </a-entity>

            <a-entity
              id="leftHand"
              laser-controls="hand: left"
              raycaster="objects: .raycastable"
            ></a-entity>
            <a-entity
              id="rightHand"
              laser-controls="hand: right"
              raycaster="objects: .raycastable"
              line="color: #118A7E"
            ></a-entity>
            <a-entity id="ui" position="0 1.6 -2.5">
              <a-entity id="menu" highlight>
                <a-entity
                  id="karigurashiButton"
                  position="-0.8 0 0"
                  mixin="frame"
                  class="raycastable menu-button"
                >
                  <a-entity material="src: #1;" mixin="poster"></a-entity>
                </a-entity>

                <a-entity
                  id="kazetachinuButton"
                  position="0 0 0"
                  mixin="frame"
                  class="raycastable menu-button"
                >
                  <a-entity material="src: #2" mixin="poster"></a-entity>
                </a-entity>

                <a-entity
                  id="ponyoButton"
                  position="0.8 0 0"
                  mixin="frame"
                  class="raycastable menu-button"
                >
                  <a-entity material="src: #3" mixin="poster">
                    <a-entity
                      id="infoPanel"
                      position="0.15 0 0.2"
                      scale="0.1 0.05 1"
                      geometry="primitive: plane; width: 1.5; height: 1.8"
                      material="color: #0086e7; shader: flat; transparent: false;"
                      radius="0.01"
                      class="raycastable"
                    >
                      <a-entity
                        id="tag"
                        position="-0.5 0 0"
                        text="shader: msdf; anchor: left; width: 5; color: white; value: #summer"
                      ></a-entity>
                    </a-entity>
                  </a-entity>
                </a-entity>
              </a-entity>
            </a-entity>
          </a-scene>
          <BackButton to="/WishTrip">
            <Back width="3.2rem" height="3.2rem" />
          </BackButton>
          <Add to="Create">
            <Camera />
            <span>포스트 남기기</span>
          </Add>
        </ARContainer>
      )}
    </>
  );
}

export default Ar;
