import { Routes, Route } from "react-router-dom";
import "./App.css";
import Start from "./pages/Authentication/Start";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import Ar from "./pages/Ar/Ar";

function App() {
  return (
    <>
      <Routes>
        <Route path="WishTrip" element={<Start />} />
        <Route path="WishTrip/Authentication" element={<Authentication />} />
        <Route path="Home" element={<Home />} />
        <Route path="AR" element={<Ar />} />
      </Routes>
    </>
  );
}

export default App;
