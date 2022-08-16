import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../../../assets/images/tabler_arrow-left.svg";
import { ReactComponent as Submit } from "../../../assets/images/uil_message.svg";

const StyledHeader = styled.div`
  display: flex;
  height: 5.6rem;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  & h1 {
    font-family: "ExtraBold";
    font-size: 1.6rem;
    line-height: 2rem;
    color: ${(props) => props.theme.palette.default2};
  }
`;

const BackBtn = styled(Link)``;

function CreateHeader() {
  return (
    <StyledHeader>
      <BackBtn to="/ARTrip">
        <Arrow />
      </BackBtn>
      <h1>새 포스트</h1>
      <Submit />
    </StyledHeader>
  );
}

export default CreateHeader;