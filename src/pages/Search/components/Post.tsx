import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPost = styled.div`
  height: 19.2rem;
  width: 14.4rem;
  border-radius: 0.8rem;
  position: relative;
  flex-grow: 1;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4);
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

interface PostPropsType {
  post_id: number;
  image: string;
  title: string;
  username: string;
}

function Post({ post_id, image, title, username }: PostPropsType) {
  const navigate = useNavigate();

  return (
    <StyledPost onClick={() => navigate(`../Read/:${post_id}`)}>
      <img src={image} alt={`${title} 게시물 입니다`} />
      <h2>{title}</h2>
      <span>{username}</span>
    </StyledPost>
  );
}
export default Post;
