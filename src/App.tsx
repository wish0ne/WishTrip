import { Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import Authentication from "./pages/Authentication/Authentication";
import Start from "./pages/Authentication/Start";
import Home from "./pages/Home/Home";
import Ar from "./pages/Ar/Ar";
import ARCreate from "./pages/Ar/Create";
import Mypage from "./pages/Mypage/Mypage";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="WishTrip" element={<Home />} />
        <Route path="Authentication" element={<Authentication />} />
        <Route path="Authentication/Start" element={<Start />} />
        <Route path="ARTrip" element={<Ar />} />
        <Route path="ARTrip/Create" element={<ARCreate />} />
        <Route path="Mypage" element={<Mypage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
