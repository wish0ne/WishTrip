import styled from "styled-components";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";

const StyledHeader = styled.div`
  background-color: blue;
  width: 100%;
  height: 5.6rem;
  font-family: "ExtraBold";
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
}

export default Header;
