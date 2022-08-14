import styled from "styled-components";
import { ReactComponent as Icon } from "../../../assets/images/uil_location-point.svg";

const StyledEvent = styled.div`
  background-color: ${(props) => props.theme.palette.inversed1};
  height: 4.7rem;
  border-radius: 0.8rem;
  margin: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    font-family: "SemiBold";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.red};
    line-height: 1.7rem;
    margin-left: 0.4rem;
  }

  & span + span {
    color: ${(props) => props.theme.palette.default2};
    margin-left: 0.6rem;
  }
`;

function Event() {
  return (
    <StyledEvent>
      <Icon height="1.7rem" width="1.7rem" />
      <span>강남역</span>
      <span>랜덤박스 이벤트 시작!</span>
    </StyledEvent>
  );
}
export default Event;
