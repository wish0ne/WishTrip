import styled from "styled-components";
import Header from "../components/Header";
import User from "../components/User";
import Image from "./components/Image";
import Emotion from "./components/Emotion";
import Content from "./components/Content";
import Comment from "./components/Comment";
import img1 from "../../assets/images/여행사진1.jpg";

const StyledRead = styled.div``;

const ReadUser = styled(User)`
  & img {
    margin-right: 1rem;
  }
  & h1 {
    font-family: "SemiBold";
    color: ${(props) => props.theme.palette.default2};
  }
  & h2 {
    color: ${(props) => props.theme.palette.default1};
  }
`;

function Read() {
  return (
    <StyledRead>
      <Header title="화려한 곳 어때요?"></Header>
      <ReadUser
        icon={img1}
        title="부끄러운 프로도"
        subtitle="1년 전"
        className="user"
      />
      <Image></Image>
      <Emotion></Emotion>
      <Content></Content>
      <Comment></Comment>
    </StyledRead>
  );
}

export default Read;
