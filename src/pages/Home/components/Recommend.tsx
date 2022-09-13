import styled from "styled-components";
import { RecommendContentData } from "../../../recoil/home";

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

const PostContainer = styled.div`
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

  & + & {
    margin-left: 1.4rem;
  }
`;
const Info = styled.div`
  position: absolute;
  display: flex;
  left: 1.6rem;
  bottom: 1.6rem;

  & img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 4rem;
    margin-right: 0.8rem;
  }

  & div {
    font-family: "ExtraBold";
    color: white;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & div > span {
    font-family: "Medium";
    font-size: 1.2rem;
    margin-top: 0.2rem;
  }
`;

interface RecommendProps {
  tag: string;
  contents: RecommendContentData[];
}

function Recommend({ tag, contents }: RecommendProps) {
  return (
    <StyledRecommend>
      <Title>
        <span>{tag}</span> 곳 어때요?
      </Title>
      <PostContainer>
        {contents.map((content) => (
          <Post key={content.id}>
            <img src={content.image} alt="추천 포스트 이미지" />
            <h3>{content.title}</h3>
            <Info>
              <img src={content.profile} alt="추천 포스트 유저" />
              <div>
                {content.username}
                <span>@{content.location}</span>
              </div>
            </Info>
          </Post>
        ))}
      </PostContainer>
    </StyledRecommend>
  );
}
export default Recommend;
