import styled from "styled-components";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";
import { ReactComponent as Bell } from "../../../assets/images/uil_bell.svg";

const StyledHeader = styled.div`
  height: 5.6rem;
  font-family: "ExtraBold";
  padding: 0 2rem 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserIcon = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.inversed3};
  margin-left: 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <Logo width="7.2rem" height="2rem" />
      <StyledDiv>
        <Bell />
        <UserIcon />
      </StyledDiv>
    </StyledHeader>
  );
}

export default Header;
