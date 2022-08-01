import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Ar from "./pages/Ar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/WishTrip" element={<Home />} />
        <Route path="/WishTrip/AR" element={<Ar />} />
      </Routes>
    </>
  );
}

export default App;
