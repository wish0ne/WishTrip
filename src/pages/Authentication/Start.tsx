import styled from "styled-components";
import img1 from "../../assets/images/여행사진5.jpg";
import img5 from "../../assets/images/여행사진8.jpg";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import User from "../components/User";

const StyledStart = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

const Bottom = styled.div`
  height: 34%;
  box-sizing: border-box;
  padding: 2.4rem;
  h1 {
    margin-top: 1.2rem;
    font-family: "ExtraBold";
    font-size: 2.4rem;
    color: ${(props) => props.theme.palette.default2};
  }
  > div {
    padding: 0 0.8rem;
    margin-bottom: 4rem;
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
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  return (
    <StyledStart>
      <Landing>
        <img src={img1} alt="로그인 화면 여행 사진" />
        <User icon={img5} name="gamsungcross" location="프랑스 파리" />
      </Landing>
      <Bottom>
        <div>
          <Logo width="6.9rem" height="2.2rem" />
          <h1>내 친구가 추천하는 여행</h1>
        </div>
        <StyledBtn to="../Authentication">이메일로 시작하기</StyledBtn>
      </Bottom>
    </StyledStart>
  );
}

export default Start;
