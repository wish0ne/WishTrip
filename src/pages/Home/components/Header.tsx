import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";
import { ReactComponent as Bell } from "../../../assets/images/uil_bell.svg";
import img9 from "../../../assets/images/여행사진9.jpg";

const StyledHeader = styled.div`
  height: 5.6rem;
  font-family: "ExtraBold";
  padding: 0 2rem 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserIcon = styled(Link)`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.palette.inversed3};
  margin-left: 2rem;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  return (
    <StyledHeader>
      <Logo width="7.2rem" height="2rem" />
      <StyledDiv>
        <Bell />
        <UserIcon to="/Authentication/Start">
          {token && <img src={img9} alt="유저아이콘" />}
        </UserIcon>
      </StyledDiv>
    </StyledHeader>
  );
}

export default Header;
