import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/images/Logo.svg";
import { useRecoilValue } from "recoil";
import { homeProfile } from "../../../recoil/home";

const StyledHeader = styled.div`
  height: 5.6rem;
  font-family: "ExtraBold";
  padding: 0 2rem 0 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  /* 데스크탑 */
  @media screen and (min-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.palette.primary3};
    z-index: 10;
    margin-bottom: 5.6rem;
  }
`;

const StyledLogo = styled(Logo)`
  /* 데스크탑 */
  @media screen and (min-width: 1024px) {
    path {
      fill: white;
    }
  }
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
      <StyledLogo width="7.2rem" height="2rem" />
      <StyledDiv>
        {profile && (
          <UserIcon to="../Mypage" onClick={() => navigate("../Mypage")}>
            <img src={profile} alt="유저아이콘" />
          </UserIcon>
        )}
      </StyledDiv>
    </StyledHeader>
  );
}

export default Header;
