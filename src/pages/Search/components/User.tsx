import styled from "styled-components";
import img1 from "../../../assets/images/여행사진1.jpg";

const StyledUser = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
  align-items: center;
  > img {
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 3.6rem;
    auto-fit: cover;
  }
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

function User() {
  return (
    <StyledUser>
      <img src={img1} alt="유저 아이콘" />
      <div>
        <h3>부끄러운 프로도피자</h3>
        <span>게시물 312개</span>
      </div>
    </StyledUser>
  );
}
export default User;
