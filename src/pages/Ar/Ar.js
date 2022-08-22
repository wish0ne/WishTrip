import * as AFRAME from "aframe";
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

const entities = [
  {
    id: 1,
    latitude: 37.240832,
    longitude: 127.0775808,
    image: img1,
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
    image: post,
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

function Ar() {
  const arjsStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  const [loading, setLoading] = useState(false);

  const initialising = () => {
    AFRAME.registerComponent("clickhandler", {
      init: function () {
        let data = this.data;
        let el = this.el;
        el.addEventListener("click", () => {
          alert(data);
        });
        // el.addEventListener("fusing", () => {
        //   alert("fusing");
        // });
      },
    });
  };

  useEffect(() => {
    alert("테스트 10");
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
      // initialising();
      setLoading(true);
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

  return (
    <>
      {arjsStatus === "ready" && lookatStatus === "ready" && (
        <ARContainer>
          <a-scene
            debug
            cursor="rayOrigin: mouse;"
            raycaster="objects: .raycastable"
            vr-mode-ui="enabled: false"
            // embedded
            arjs="sourceType: webcam; sourceWidth:1080; sourceHeight:764; displayWidth: 1080; displayHeight: 764; debugUIEnabled: false; videoTexture:true;"
            //vr-mode-ui="enabled: false"
            //arjs="sourceType: webcam; debugUIEnabled: false;"
            //videoTexture:true;
          >
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
                <img
                  id={entity.id}
                  src={entity.image}
                  alt="ar post"
                  key={entity.id}
                />
              ))}
            </a-assets>
            <a-camera gps-camera="" rotation-reader=""></a-camera>
            {/* <a-box
              gps-entity-place={`latitude: 34.8821077; longitude: 128.6418929`}
              material={"color: blue"}
              scale="10 10 10"
            ></a-box> */}

            {/* <a-entity
              id="leftHand"
              laser-controls="hand: left"
              raycaster="objects: .raycastable"
            ></a-entity>
            <a-entity
              id="rightHand"
              laser-controls="hand: right"
              raycaster="objects: .raycastable"
              line="color: #118A7E"
            ></a-entity> */}

            {entities.map((entity) => (
              <a-image
                gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude}`}
                class="raycastable"
                clickhandler={entity.id}
                key={entity.id}
                src={`#${entity.id}`}
                look-at="[gps-camera]"
              ></a-image>
            ))}
            <a-image
              position="-1 0.5 -3"
              src="#4"
              class="raycastable"
              clickhandler={10}
              look-at="[gps-camera]"
            ></a-image>
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
