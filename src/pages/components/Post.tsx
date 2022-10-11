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
  > div {
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
    right: 1.2rem;
    > h2 {
      font-family: "ExtraBold";
      color: white;
      font-size: 1.3rem;
      margin-bottom: 0.4rem;
    }
    > span {
      font-family: "Medium";
      color: white;
      font-size: 1.2rem;
      white-space: nowrap;
      display: block;
      overflow: hidden;
      line-height: 1.4rem;
      text-overflow: ellipsis;
    }
  }
`;

interface PostPropsType {
  post_id: number;
  image: string;
  title: string;
  username?: string;
  tags?: string[];
  onClick: () => void;
  grow: boolean;
}

function Post({
  post_id,
  image,
  title,
  username,
  tags,
  onClick,
  grow,
}: PostPropsType) {
  const navigate = useNavigate();

  return (
    <StyledPost
      onClick={() => {
        onClick();
        //포스트로 이동
        navigate(`../Read/:${post_id}`);
      }}
      grow={grow}
    >
      <img src={image} alt={`${title} 게시물 입니다`} />
      <div>
        <h2>{title}</h2>
        {tags && <span>#{tags.join(" #")}</span>}
        {username && <span>{username}</span>}
      </div>
    </StyledPost>
  );
}
export default Post;
