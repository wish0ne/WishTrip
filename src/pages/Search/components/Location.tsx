import styled from "styled-components";
import { ReactComponent as Icon } from "../../../assets/images/uil_location-point.svg";

const StyledLocation = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    font-family: "Medium";
    margin-left: 2rem;

    > h3 {
      font-size: 1.4rem;
      margin-bottom: 0.2rem;
      color: ${(props) => props.theme.palette.default1};
    }
    > span {
      font-size: 1.2rem;
      color: ${(props) => props.theme.palette.inversed3};
    }
  }
`;

function Location() {
  return (
    <StyledLocation>
      <Icon width="2rem" height="2rem" fill="rgb(112, 112, 112)" />
      <div>
        <h3>해운대</h3>
        <span>게시물 312개</span>
      </div>
    </StyledLocation>
  );
}
export default Location;
