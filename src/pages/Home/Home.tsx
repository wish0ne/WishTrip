import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
`;

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
      <StyledButton to="Home">POST</StyledButton>
      <StyledButton to="/AR">AR</StyledButton>
    </StyledHome>
  );
}

export default Home;
