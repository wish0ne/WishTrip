import styled from "styled-components";
import Header from "./components/Header";
import User from "./components/User";

const StyledMypage = styled.div`
  padding: 0 2.4rem;
`;

function Mypage() {
  return (
    <StyledMypage>
      <Header />
      <User />
    </StyledMypage>
  );
}

export default Mypage;
