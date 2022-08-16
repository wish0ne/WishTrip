import styled from "styled-components";
import img1 from "../../assets/images/여행사진1.jpg";
import img3 from "../../assets/images/여행사진3.jpg";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import User from "../components/User";

const StyledStart = styled.div`
  height: 100vh;
`;

const Bottom = styled.div`
  padding: 2.4rem;

  h1 {
    font-family: "ExtraBold";
    font-size: 2.4rem;
    color: ${(props) => props.theme.palette.default2};
  }
`;

const Landing = styled.div`
  width: 100%;
  height: 66%;
  position: relative;
  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  & > div {
    position: absolute;
    bottom: 2.4rem;
    left: 2.4rem;
  }
`;

const StyledBtn = styled(Link)`
  display: block;
  border-radius: 1.6rem;
  text-align: center;
  line-height: 5.6rem;
  height: 5.6rem;
  background-color: ${(props) => props.theme.palette.primary2};
  font-family: "ExtraBold";
  font-size: 1.6rem;
  color: ${(props) => props.theme.palette.white};
  text-decoration: none;
  box-shadow: 0 0.8rem 1.6rem rgba(90, 192, 250, 0.28);
`;

function Start() {
  return (
    <StyledStart>
      <Landing>
        <img src={img1} alt="로그인 화면 여행 사진" />
        <User icon={img3} name="부끄러운 프로도" location="제주 애월읍" />
      </Landing>
      <Bottom>
        <Logo width="6.9rem" height="2.2rem" />
        <h1>내 친구가 추천하는 여행</h1>
        <StyledBtn to="/Authentication">이메일로 시작하기</StyledBtn>
      </Bottom>
    </StyledStart>
  );
}

export default Start;
