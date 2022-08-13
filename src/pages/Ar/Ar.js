import * as AFRAME from "aframe";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useScript from "../../modules/useScript.ts";

const entities = [
  { id: 1, latitude: 34.891004, longitude: 128.639782, color: "red" },
  { id: 2, latitude: 34.891469, longitude: 128.638849, color: "yellow" },
  { id: 3, latitude: 34.890422, longitude: 128.638861, color: "blue" },
];

const ARContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Center = styled.div`
  height: 10rem;
  background-color: white;
  position: fixed;
  bottom: 2%;
  flex-direction: row;
  width: 20rem;
  border-radius: 1rem;
  margin: 0px auto;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 10rem;
  font-size: 1.2rem;
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
    AFRAME.registerComponent("eventbox", {
      init: function () {
        this.el.addEventListener("click", () => {
          alert("box click");
        });
      },
    });

    AFRAME.registerComponent("testbox", {
      init: function () {
        this.el.addEventListener("click", () => {
          alert("box click");
        });
      },
    });
  };

  useEffect(() => {
    if (!loading) {
      initialising();
      setLoading(true);
    }
    // window.addEventListener("gps-camera-update-position", (e) => {
    //   alert("camera position update");
    //   console.log(e);
    // });

    return () => {
      let body = document.querySelector("body");
      let video = document.querySelector("video");
      body.removeChild(video);
    };
  }, []);

  return (
    <>
      <div>{arjsStatus}</div>
      <div>{loading}</div>
      {loading && arjsStatus === "ready" && lookatStatus === "ready" && (
        <ARContainer>
          <a-scene
            embedded
            vr-mode-ui="enabled: false"
            arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
            renderer="antialias: true; alpha: true"
          >
            <a-camera gps-camera="" rotation-reader="">
              <a-cursor></a-cursor>
            </a-camera>
            <a-box position="1 3 1" material="color:purple" testbox />
            {entities.map((entity) => {
              return (
                <a-box
                  gps-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude}`}
                  material={`color: ${entity.color}`}
                  scale="10 10 10"
                  key={entity.id}
                  eventbox
                ></a-box>
              );
            })}
            <a-entity
              position="0 0 0"
              scale="0.05 0.05 0.05"
              gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
            ></a-entity>
            {/* <a-box material="color:turquoise" position="1 2 1" /> */}
            {/* <a-box
            gps-entity-place="latitude: 37.243225; longitude: 127.077449"
            material="color: turquoise"
            scale="10 10 10"
            boxentity
          ></a-box>
          <a-entity textentity></a-entity>
          <a-entity boxsentity></a-entity> */}
          </a-scene>
          <Center onClick={() => alert("overlay click")}>overlay test</Center>
        </ARContainer>
      )}
    </>
  );
}

export default Ar;
