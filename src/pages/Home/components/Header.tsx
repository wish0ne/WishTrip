import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";
import { ReactComponent as Bell } from "../../../assets/images/uil_bell.svg";
import { useRecoilValue } from "recoil";
import { homeProfile } from "../../../recoil/home";

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
  const profile = useRecoilValue(homeProfile);
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <Logo width="7.2rem" height="2rem" />
      <StyledDiv>
        <Bell width="2.4rem" height="2.4rem" />
        <UserIcon to="../Mypage" onClick={() => navigate("../Mypage")}>
          {profile && <img src={profile} alt="유저아이콘" />}
        </UserIcon>
      </StyledDiv>
    </StyledHeader>
  );
}

export default Header;
