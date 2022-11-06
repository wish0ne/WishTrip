import { Routes, Route } from "react-router-dom";
import * as AFRAME from "aframe";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Start from "./pages/Authentication/Start";
import Home from "./pages/Home/Home";
import Ar from "./pages/Ar/Ar";
import ARCreate from "./pages/Ar/Create";
import Mypage from "./pages/Mypage/Mypage";
import Email from "./pages/Authentication/Email";
import Password from "./pages/Authentication/Password";
import Register from "./pages/Authentication/Register";
import Search from "./pages/Search/Search";
import Read from "./pages/Post/Read";
import Profile from "./pages/Profile/Profile";
import { useEffect, useRef } from "react";
import { useRecoilSnapshot, useRecoilState, useSetRecoilState } from "recoil";
import { arId, userCoords } from "./recoil/ar";
import Splash from "./pages/Splash/Splash";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size: 62.5%;
    height: 100%;
    min-height: calc(100% + env(safe-area-inset-top));
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
  
  body {
    max-width: 450px;
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  
  body::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  
  #root {
    height: 100%;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  /* mobile first */
  @media screen and (max-width: 320px) {
    html {
      font-size: 30%;
    }
  }


  /* 태블릿 */
  @media screen and (max-width: 768px) and (min-width: 375px) {
    html {
      font-size: 50%;
    }
  }

  /* 데스크탑 */
  @media screen and (min-width: 769px) {
    html {
      font-size: 60%;
    }
  }
`;

const theme = {
  palette: {
    primary2: "#0eb6fe",
    primary1: "#00d8ec",
    white: "#ffffff",
    primary3: "#0086e7",
    inversed2: "#eeeeee",
    inversed1: "#fafafa",
    default2: "#4a4a4a",
    inversed3: "#cdcdcd",
    default1: "#707070",
    secondary2: "#84f32d",
    default3: "#1a1a1a",
    secondary1: "#9df557",
    secondary3: "#6be30d",
    red: "#f24125",
  },
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  var radLat1 = (Math.PI * lat1) / 180;
  var radLat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radTheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
}

function App() {
  const isRegister = useRef(false);
  const setArId = useSetRecoilState(arId);
  const [coords, setCoords] = useRecoilState(userCoords);
  useEffect(() => {
    if (!isRegister.current) {
      //AR click handler
      AFRAME.registerComponent("camera-handler", {
        init: function () {
          alert("camera initializing!");
          window.addEventListener("gps-camera-update-position", (e: any) => {
            // alert(
            //   `${e.detail.position.longitude}, ${e.detail.position.latitude}`,
            // );
            let distance = getDistance(
              coords.x,
              coords.y,
              e.detail.position.latitude,
              e.detail.position.longitude,
            );
            alert(distance);
            if (coords === undefined || distance >= 1000) {
              setCoords({
                x: e.detail.position.latitude,
                y: e.detail.position.longitude,
              });
            }
          });

          window.addEventListener("gps-camera-origin-coord-set", (e: any) => {
            alert("camera set");
          });
        },
      });

      AFRAME.registerComponent("clickhandler", {
        init: function () {
          alert("component initialising!");
          // window.addEventListener("gps-camera-update-position", (e: any) => {
          //   alert(e.detail.position);
          //   setCoords({
          //     x: e.detail.position.latitude,
          //     y: e.detail.position.longitude,
          //   });
          // });

          // window.addEventListener("gps-camera-origin-coord-set", (e: any) => {
          //   alert("camera set");
          // });

          let data = this.data;
          let el = this.el;
          el.addEventListener("click", () => {
            setArId(data);
            // localStorage.setItem("arId", data);
            // const modal = document.querySelector(".modal");
            // modal.classList.add("half");
          });
        },
      });
      isRegister.current = true;
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="WishTrip/">
          <Route path="" element={<Splash />} />
          <Route path="Home" element={<Home />} />
          <Route path="Authentication">
            <Route path="Start" element={<Start />} />
            <Route path="Email" element={<Email />} />
            <Route path="Password" element={<Password />} />
            <Route path="Register" element={<Register />} />
          </Route>
          <Route path="Search" element={<Search />} />
          <Route path="Read/:postId" element={<Read />} />
          <Route path="ARTrip" element={<Ar />} />
          <Route path="ARTrip/Create" element={<ARCreate />} />
          <Route path="Mypage" element={<Mypage />} />
          <Route path="Profile/:username" element={<Profile />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
