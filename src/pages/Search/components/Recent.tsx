import styled from "styled-components";
import { ReactComponent as Delete } from "../../../assets/images/uil_multiply.svg";

const StyledRecent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
  > div {
    display: flex;
    flex-direction: column;
    font-family: "Medium";
    > h3 {
      font-size: 1.4rem;
      color: ${(props) => props.theme.palette.default1};
      margin-bottom: 0.2rem;
    }
    > span {
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.inversed3};
    }
  }
`;

function Recent() {
  return (
    <StyledRecent>
      <div>
        <h3>여행</h3>
        <span>08. 12</span>
      </div>
      <Delete width="1.6rem" height="1.6rem" fill="rgb(205 205 205)"></Delete>
    </StyledRecent>
  );
}
export default Recent;
