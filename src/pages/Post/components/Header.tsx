import styled from "styled-components";
import { ReactComponent as Icon } from "../../../assets/images/uil_arrow-left.svg";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1.6rem 0;
  > h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "ExtraBold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default2};
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Icon width="2.4rem" height="2.4rem" />
      <h1>화려한 곳 어때요?</h1>
    </StyledHeader>
  );
}

export default Header;
