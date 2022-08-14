import styled from "styled-components";
import Header from "./components/Header";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Event from "./components/Event";
import Recommend from "./components/Recommend";

const StyledHome = styled.div``;

function Home() {
  return (
    <StyledHome>
      <Header />
      <Story />
      <Menu />
      <Event />
      <Recommend />
    </StyledHome>
  );
}

export default Home;
