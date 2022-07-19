import { useEffect, useRef } from "react";
import "./App.css";

// window.onload = () => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position);
//     document
//       .querySelector("a-entity")
//       .setAttribute(
//         "gps-entity-place",
//         `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`,
//       );
//     document
//       .querySelector("a-box")
//       .setAttribute(
//         "gps-entity-place",
//         `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`,
//       );
//     document
//       .querySelector("a-text")
//       .setAttribute(
//         "gps-entity-place",
//         `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`,
//       );
//     document
//       .querySelector("a-text")
//       .setAttribute(
//         "value",
//         `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`,
//       );
//   });
// };

function Ar() {
  // const [latitude, setLatitude] = useState<Number>(0);
  // const [longitude, setLongitude] = useState<Number>(0);
  // const [value, setValue] = useState<string>("ar text");

  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log(position);
  // });

  // const sceneRef = useRef();
  const entityRef = useRef();
  const cameraRef = useRef();
  const sceneRef = useRef();

  // useEffect(() => {
  //   console.log(entityRef.current.attributes.scale);
  //   console.log(entityRef.current.attributes.geometry);
  //   console.log(entityRef.current.attributes.color);
  //   console.log(entityRef.current.attributes.material);
  //   console.log(entityRef.current.attributes["gps-entity-place"]);
  //   console.log(entityRef.current.getAttribute("gps-entity-place"));
  //   console.log(entityRef.current.attributes);
  //   entityRef.current.attributes["gps-entity-place"].value =
  //     "latitude: 37.242825; longitude: 127.077049;";
  //   entityRef.current.attributes.scale.value = "20 20 20";
  //   cameraRef.current.attributes["rotation-reader"].value = "";
  //   sceneRef.current.attributes["vr-mode-ui"].value = "enabled: false";
  // }, []);

  return (
    <>
      {/* <a-scene
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
        ref={sceneRef}
      >
        <a-box
          scale="20 20 20"
          color="red"
          gps-entity-place="latitude: 37.242825; longitude: 127.077049;"
          ref={entityRef}
        >
          <a-camera gps-camera rotation-reader ref={cameraRef}></a-camera>
        </a-box>
      </a-scene> */}
    </>
  );
}

export default Ar;
