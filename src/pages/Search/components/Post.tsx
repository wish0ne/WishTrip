import styled from "styled-components";
import img1 from "../../../assets/images/여행사진1.jpg";

const StyledPost = styled.div`
  height: 19.2rem;
  width: 14.4rem;
  border-radius: 0.8rem;
  position: relative;
  flex-grow: 1;
  > img {
    height: 19.2rem;
    width: 14.4rem;
    border-radius: 0.8rem;
    auto-fit: cover;
  }
  > h2 {
    position: absolute;
    font-family: "ExtraBold";
    color: white;
    font-size: 1.3rem;
    left: 1.2rem;
    right: 1.2rem;
    bottom: 3rem;
  }
  > span {
    position: absolute;
    font-family: "Medium";
    color: white;
    font-size: 1.2rem;
    bottom: 1.2rem;
    right: 1.2rem;
    left: 1.2rem;
  }
`;

function Post() {
  return (
    <StyledPost>
      <img src={img1} alt="포스트 이미지" />
      <h2>사소하지만 아름다운 풍경들</h2>
      <span>gamsungcross</span>
    </StyledPost>
  );
}
export default Post;
