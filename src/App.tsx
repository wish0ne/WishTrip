import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import * as AFRAME from "aframe";
import { ThemeProvider } from "styled-components";
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
import { useRecoilState, useSetRecoilState } from "recoil";
import { arId, userCoords } from "./recoil/ar";
import Splash from "./pages/Splash/Splash";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

function App() {
  const isRegister = useRef(false);
  const setArId = useSetRecoilState(arId);
  const [coords, setCoords] = useRecoilState(userCoords);
  useEffect(() => {
    if (!isRegister.current) {
      //AR click handler
      // AFRAME.registerComponent("camera-handler", {
      //   init: function () {
      //     window.addEventListener("gps-camera-update-position", (e: any) => {
      //       setCoords({
      //         x: e.detail.position.latitude,
      //         y: e.detail.position.longitude,
      //       });
      //     });
      //   },
      // });

      AFRAME.registerComponent("clickhandler", {
        init: function () {
          let data = this.data;
          let el = this.el;
          el.addEventListener("click", () => {
            setArId(null);
            setArId(data);
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
        {/* <Route path="WishTrip/"> */}
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
        <Route path="Create" element={<ARCreate />} />
        <Route path="Mypage" element={<Mypage />} />
        <Route path="Profile/:username" element={<Profile />} />
        {/* </Route> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
