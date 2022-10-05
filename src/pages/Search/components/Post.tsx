import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPost = styled.div<{ grow: boolean }>`
  width: ${(props) => (props.grow ? "48%" : "14.4rem")};
  aspect-ratio: 1/1.35;
  border-radius: 0.8rem;
  position: relative;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.4);
  > img {
    width: ${(props) => (props.grow ? "100%" : "14.4rem")};
    aspect-ratio: 1/1.35;
    border-radius: 0.8rem;
    object-fit: cover;
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
  username?: string;
  tag?: string[];
}

function Post({ post_id, image, title, username, tag }: PostPropsType) {
  const navigate = useNavigate();

  return (
    <StyledPost
      onClick={() => navigate(`../Read/:${post_id}`)}
      grow={tag !== undefined}
    >
      <img src={image} alt={`${title} 게시물 입니다`} />
      <h2>{title}</h2>
      {tag && <span>#{tag.join("#")}</span>}
      {username && <span>{username}</span>}
    </StyledPost>
  );
}
export default Post;
