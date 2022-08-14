import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import Ar from "./pages/Ar/Ar";

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
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="WishTrip" element={<Home />} />
          <Route path="Authentication" element={<Authentication />} />
          <Route path="AR" element={<Ar />} />
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
