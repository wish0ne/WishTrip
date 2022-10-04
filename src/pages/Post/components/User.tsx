import styled from "styled-components";
import { ReactComponent as Option } from "../../../assets/images/uil_ellipsis.svg";
import img6 from "../../../assets/images/여행사진6.jpg";

export const StyledUser = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  align-items: center;
  > div {
    display: flex;
  }
`;

export const Icon = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 4rem;
  margin-right: 1rem;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & span {
    font-family: "SemiBold";
    color: ${(props) => props.theme.palette.default2};
    font-size: 1.4rem;
  }

  & span + span {
    font-family: "Medium";
    color: ${(props) => props.theme.palette.default1};
    font-size: 1.2rem;
  }
`;

function User() {
  return (
    <StyledUser>
      <div>
        <Icon src={img6} alt="유저 아이콘" />
        <Info>
          <span>부끄러운 프로도</span>
          <span>1년전</span>
        </Info>
      </div>
      <Option width="2rem" height="2rem" fill="rgb(205 205 205)"></Option>
    </StyledUser>
  );
}

export default User;
