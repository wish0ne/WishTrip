import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          navigate("/WishTrip/AR");
        }}
      >
        Start AR
      </button>
      <hr />
      <Register />
      <hr />
      <Login />
    </div>
  );
}

export default Home;
