import * as AFRAME from "aframe";
import React, { useEffect, useState } from "react";
import useScript from "../modules/useScript.ts";

function Ar() {
  const arjsStatus = useScript(
    "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js",
  );
  const lookatStatus = useScript(
    "https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js",
  );

  const [loading, setLoading] = useState(false);
  // const location = useGeolocation();
  // const [coords, setCoords] = useState([]);

  // useEffect(() => {
  //   console.log(location);
  //   const newCoords = [];
  //   for (let i = 0; i < 4; i++) {
  //     newCoords.push([
  //       location.coordinates.lat + 0.0004 * i,
  //       location.coordinates.lng + 0.0004 * i,
  //     ]);
  //   }
  //   setCoords(newCoords);
  //   console.dir(newCoords);
  // }, [location]);

  const initialising = () => {
    AFRAME.registerComponent("boxsentity", {
      init: function () {
        this.loaded = false;
        window.addEventListener("gps-camera-update-position", (e) => {
          if (this.loaded === false) {
            this._loadBoxs(
              e.detail.position.longitude,
              e.detail.position.latitude,
            );
            this.loaded = true;
          }
        });
      },
      _loadBoxs: function (longitude, latitude) {
        alert("load boxs");
        const scale = 10;
        for (let i = 1; i < 5; i++) {
          const entity = document.createElement("a-box");
          entity.setAttribute("scale", {
            x: scale,
            y: scale,
            z: scale,
          });
          entity.setAttribute("gps-entity-place", {
            latitude: latitude + 0.0004 * i,
            longitude: longitude + 0.0004 * i,
          });

          entity.setAttribute("material", "color:orange");
          this.el.appendChild(entity);
        }
      },
    });
    AFRAME.registerComponent("textentity", {
      init: function () {
        alert("Peakfinder component initialising!");
        this.loaded = false;
        window.addEventListener("gps-camera-update-position", (e) => {
          if (this.loaded === false) {
            this._loadPeaks(
              e.detail.position.longitude,
              e.detail.position.latitude,
            );
            this.loaded = true;
          }
          this._loadDistance();
        });
      },
      _loadPeaks: function (longitude, latitude) {
        alert(longitude + " " + latitude);
        const scale = 10;
        const entity = document.createElement("a-text");
        entity.setAttribute("look-at", "[gps-camera]");
        entity.setAttribute("value", latitude + "\n" + longitude);
        entity.setAttribute("scale", {
          x: scale,
          y: scale,
          z: scale,
        });
        entity.setAttribute("gps-entity-place", {
          latitude: latitude,
          longitude: longitude,
        });
        this.el.appendChild(entity);
      },
      _loadDistance: function () {
        let distanceMsg = document
          .querySelector("[gps-entity-place]")
          .getAttribute("distanceMsg");
        if (distanceMsg) {
          alert(distanceMsg);
        }
      },
    });
    AFRAME.registerComponent("boxentity", {
      init: function () {
        alert("box component initialising!");
        // window.addEventListener("gps-entity-place-added", (e) => {
        //   alert("gps-entity-place-added");
        //   this._loadBox(e.detail);
        // });
        // window.addEventListener("gps-entity-place-loaded", (e) => {
        //   alert("gps-entity-place-loaded");
        //   console.log(e.detail.component);
        // });
        // window.addEventListener("gps-entity-place-update-position", (e) => {
        //   alert("gps-entity-place-update-position");
        //   console.log(e.detail.distance);
        // });
      },
      _loadBox: function (detail) {
        alert(detail.component.getAttribute("[gps-entity-place]"));
        console.log(detail.component);
      },
    });
  };
  useEffect(() => {
    console.log("mounted");
    console.group("loading");
    console.log(loading);
    if (!loading) {
      initialising();
      setLoading(true);
    }
    console.log(loading);
    console.groupEnd();
  }, []);

  return (
    <>
      <div>{arjsStatus}</div>
      <div>{loading}</div>
      {loading && arjsStatus === "ready" && lookatStatus === "ready" && (
        <a-scene
          vr-mode-ui="enabled: false"
          arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
          renderer="antialias: true; alpha: true"
        >
          <a-camera gps-camera="" rotation-reader=""></a-camera>
          <a-box
            position="0 0.5 -3"
            rotation="0 45 0"
            color="#4CC3D9"
            id="close"
          ></a-box>
          <a-box
            gps-entity-place="latitude: 37.243225; longitude: 127.077449"
            material="color: turquoise"
            scale="10 10 10"
            boxentity
          ></a-box>
          <a-entity textentity></a-entity>
          <a-entity boxsentity></a-entity>
        </a-scene>
      )}
    </>
  );
}

export default Ar;
