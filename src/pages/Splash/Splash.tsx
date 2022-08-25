import styled from "styled-components";
import splash from "../../assets/images/splash.png";

const StyledSplash = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

function Splash() {
  return <StyledSplash src={splash} alt="스플래시 화면"></StyledSplash>;
}

export default Splash;
