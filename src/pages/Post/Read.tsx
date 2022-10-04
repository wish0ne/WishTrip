import styled from "styled-components";
import Header from "./components/Header";
import User from "./components/User";
import Image from "./components/Image";
import Emotion from "./components/Emotion";
import Content from "./components/Content";
import Comment from "./components/Comment";

const StyledRead = styled.div`
  padding: 2.4rem;
`;

function Read() {
  return (
    <StyledRead>
      <Header></Header>
      <User></User>
      <Image></Image>
      <Emotion></Emotion>
      <Content></Content>
      <Comment></Comment>
    </StyledRead>
  );
}

export default Read;
