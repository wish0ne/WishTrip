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
import { useSetRecoilState } from "recoil";
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

interface cameraUpdatePositionEventType {
  detail: {
    position: GeolocationCoordinates;
    origin: GeolocationCoordinates;
  };
}

function App() {
  const isRegister = useRef(false);
  const setArId = useSetRecoilState(arId);
  const setCoords = useSetRecoilState(userCoords);
  useEffect(() => {
    if (!isRegister.current) {
      //AR click handler
      AFRAME.registerComponent("camera-handler", {
        init: function () {
          alert("camera initializing!");
          window.addEventListener("gps-camera-update-position", (e: any) => {
            alert(
              `${e.detail.position.longitude}, ${e.detail.position.latitude}`,
            );
            setCoords({
              x: e.detail.position.latitude,
              y: e.detail.position.longitude,
            });
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
