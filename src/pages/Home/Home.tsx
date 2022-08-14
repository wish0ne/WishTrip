import styled from "styled-components";
import Header from "./components/Header";
import Story from "./components/Story";
import Menu from "./components/Menu";

const StyledHome = styled.div``;

function Home() {
  return (
    <StyledHome>
      <Header />
      <Story />
      <Menu />
    </StyledHome>
  );
}

export default Home;
