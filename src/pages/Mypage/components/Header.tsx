import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../../../assets/images/uil_arrow-left.svg";
import { ReactComponent as Menu } from "../../../assets/images/uil_bars.svg";

const StyledHeader = styled.div`
  display: flex;
  height: 5.6rem;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-family: "ExtraBold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default2};
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Link to="/WishTrip">
        <Arrow width="2.4rem" height="2.4rem" fill="#000000" />
      </Link>
      <h1>마이페이지</h1>
      <Menu width="2.4rem" height="2.4rem" />
    </StyledHeader>
  );
}

export default Header;
