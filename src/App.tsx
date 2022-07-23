import "./App.css";
import Ar from "./Ar";

function App() {
  return (
    <>
      <div>React Project</div>
      <button
        id="arButton"
        onClick={() => {
          console.log("click");
        }}
      >
        start ar
      </button>
      <Ar />
    </>
  );
}

export default App;
