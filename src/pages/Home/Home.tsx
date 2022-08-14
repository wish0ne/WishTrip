import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Story from "./components/Story";

const StyledHome = styled.div``;

const StyledButton = styled(Link)`
  height: 8rem;
  background-color: ${(props) => props.theme.palette.red};
  width: 8rem;
  display: block;
  color: white;
  font-size: 3rem;
  text-decoration: none;
  text-align: center;
  line-height: 7.5rem;
  border-radius: 2rem;
`;

function Home() {
  return (
    <StyledHome>
      <Header />
      <Story />
      <StyledButton to="/AR">AR</StyledButton>
    </StyledHome>
  );
}

export default Home;
