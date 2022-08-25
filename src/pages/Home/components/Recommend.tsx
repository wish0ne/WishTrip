import styled from "styled-components";
import img2 from "../../../assets/images/여행사진2.jpg";
import img5 from "../../../assets/images/여행사진5.jpg";
import img6 from "../../../assets/images/여행사진6.jpg";
import img7 from "../../../assets/images/여행사진7.jpg";
import img8 from "../../../assets/images/여행사진8.jpg";
import img9 from "../../../assets/images/여행사진9.jpg";

const posts = [
  {
    id: 1,
    title: "사소하지만 아름다운 풍경들",
    image: img5,
    user: img8,
    name: "gamsungcross",
    location: "프랑스 파리",
  },
  {
    id: 2,
    title: "걷다가 만난 일몰",
    image: img9,
    user: img6,
    name: "샛별",
    location: "제주 애월읍",
  },
  {
    id: 3,
    title: "우당탕탕 일본 여행",
    image: img2,
    user: img7,
    name: "행복한세상의족제비씨",
    location: "일본 오사카",
  },
];

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
          <Post key={post.id}>
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
