import styled from "styled-components";
import Header from "./components/Header";
import User from "./components/User";
import Tab from "./components/Tab";
import Content from "./components/Content";
import img1 from "../../assets/images/여행사진1.jpg";
import img2 from "../../assets/images/여행사진2.jpg";
import img3 from "../../assets/images/여행사진3.jpg";
import img4 from "../../assets/images/여행사진4.jpg";

const contents = [
  { id: 1, image: img1, title: "여행의 제목입니다.", user: "부끄러운 프로도" },
  { id: 2, image: img2, title: "여행의 제목입니다.", user: "부끄러운 프로도" },
  { id: 3, image: img3, title: "여행의 제목입니다.", user: "부끄러운 프로도" },
  { id: 4, image: img4, title: "여행의 제목입니다.", user: "부끄러운 프로도" },
  { id: 5, image: img3, title: "여행의 제목입니다.", user: "부끄러운 프로도" },
];

const StyledMypage = styled.div`
  padding: 0 2.4rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.6rem 0;
  gap: 1.6rem;
`;

function Mypage() {
  return (
    <StyledMypage>
      <Header />
      <User />
      <Tab />
      <StyledContent>
        {contents.map((content) => (
          <Content
            image={content.image}
            title={content.title}
            user={content.user}
            key={content.id}
          />
        ))}
      </StyledContent>
    </StyledMypage>
  );
}

export default Mypage;
