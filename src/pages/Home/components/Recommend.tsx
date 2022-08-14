import styled from "styled-components";
import img3 from "../../../assets/images/여행사진3.jpg";
import img4 from "../../../assets/images/여행사진4.jpg";

const posts = [
  {
    id: 1,
    title: "여행의 제목입니다.",
    image: img3,
    user: img4,
    name: "부끄러운 프로도",
    location: "제주 애월읍",
  },
  {
    id: 2,
    title: "여행의 제목입니다.",
    image: img4,
    user: img3,
    name: "부끄러운 프로도",
    location: "제주 애월읍",
  },
];

const StyledRecommend = styled.div`
  margin: 4.8rem 2.4rem;
`;

const Title = styled.div`
  font-family: "ExtraBold";
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

  & h3 {
    font-family: "ExtraBold";
    color: white;
    top: 2rem;
    left: 1.6rem;
    position: absolute;
    font-size: 1.6rem;
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
  }

  & div span {
    font-family: "Medium";
    font-size: 1.2rem;
  }
`;

function Recommend() {
  return (
    <StyledRecommend>
      <Title>
        <span>한적한</span> 곳 어때요?
      </Title>
      <PostContainer>
        {posts.map((post) => (
          <Post>
            <img src={post.image} alt="추천 포스트 이미지" />
            <h3>{post.title}</h3>
            <Info>
              <img src={post.user} alt="추천 포스트 유저" />
              <div>
                {post.name}
                <span>@{post.location}</span>
              </div>
            </Info>
          </Post>
        ))}
      </PostContainer>
    </StyledRecommend>
  );
}
export default Recommend;
