import styled from "styled-components";
import img2 from "../../../assets/images/여행사진2.jpg";

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  margin: 2.4rem 0;
  img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 4rem;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 1.6rem;
    span {
      font-family: "ExtraBold";
      font-size: 1.6rem;
      color: ${(props) => props.theme.palette.default2};
    }
    span + span {
      font-family: "Medium";
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.default1};
    }
  }
`;

function User() {
  return (
    <StyledUser>
      <img src={img2} alt="마이페이지 유저 프로필사진" />
      <div>
        <span>부끄러운 프로도</span>
        <span>frodo@gmailc.om</span>
      </div>
    </StyledUser>
  );
}

export default User;
