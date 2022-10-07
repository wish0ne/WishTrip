import styled from "styled-components";
import Header from "../components/Header";
import User from "./components/User";
import Image from "./components/Image";
import Emotion from "./components/Emotion";
import Content from "./components/Content";
import Comment from "./components/Comment";

const StyledRead = styled.div``;

function Read() {
  return (
    <StyledRead>
      <Header title="화려한 곳 어때요?"></Header>
      <User></User>
      <Image></Image>
      <Emotion></Emotion>
      <Content></Content>
      <Comment></Comment>
    </StyledRead>
  );
}

export default Read;
