import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Ar from "./Ar";

function App() {
  return (
    <>
      <div>React Project</div>
      <button
        onClick={() => {
          console.log("click");
        }}
      >
        Start AR
      </button>
      <hr />
      <Register />
      <hr />
      <Login />
      {/* <Ar /> */}
    </>
  );
}

export default App;
