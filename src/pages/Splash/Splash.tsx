import styled from "styled-components";
import splash from "../../assets/images/splash.png";

const StyledSplash = styled.img`
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  object-fit: cover;
`;

function Splash() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  return <StyledSplash src={splash} alt="스플래시 화면"></StyledSplash>;
}

export default Splash;
