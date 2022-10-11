import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RecommendContentData } from "../../../recoil/home";
import User from "../../components/User";
import { FixedPost } from "../../Search/Search";

const StyledRecommend = styled.div`
  margin: 4.8rem 2.4rem;
`;

const Title = styled.div`
  font-family: "SemiBold";
  font-size: 2.1rem;
  color: ${(props) => props.theme.palette.default2};
  margin-bottom: 2rem;
  & span {
    color: ${(props) => props.theme.palette.primary3};
    border-bottom: solid 0.3rem;
  }
`;

const PostContainer = styled(FixedPost)`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

const Post = styled.div`
  width: 20rem;
  height: 25.6rem;
  & > img {
    border-radius: 0.8rem;
    width: 20rem;
    height: 25.6rem;
  }
  position: relative;
  & > h3 {
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 1.6rem;
    font-family: "ExtraBold";
    color: white;
    top: 0;
    left: 0;
    position: absolute;
    font-size: 1.6rem;
    margin: 0;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const RecUser = styled(User)`
  position: absolute;
  display: flex;
  left: 1.6rem;
  bottom: 1.6rem;

  & img {
    margin-right: 0.8rem;
  }
  & h1 {
    color: white;
    font-size: 1.3rem;
  }
  & h2 {
    color: white;
  }
`;

interface RecommendProps {
  tag: string;
  posts: RecommendContentData[];
}

function Recommend({ tag, posts }: RecommendProps) {
  const navigate = useNavigate();
  return (
    <StyledRecommend>
      <Title>
        <span>{tag}</span> 곳 어때요?
      </Title>
      <PostContainer>
        {posts.map((content) => (
          <Post
            key={content.post_id}
            onClick={() => navigate(`../Read/${content.post_id}`)}
          >
            <img src={content.image} alt="추천 포스트 이미지" />
            <h3>{content.title}</h3>
            <RecUser
              className="user"
              icon={content.icon}
              title={content.username}
              subtitle={"@" + content.location}
            />
          </Post>
        ))}
      </PostContainer>
    </StyledRecommend>
  );
}
export default Recommend;
