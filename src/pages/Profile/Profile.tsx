import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import Info from "./components/Info";
import Tab from "./components/Tab";

const StyledProfile = styled.div``;

function Profile() {
  return (
    <StyledProfile>
      <Header title="프로필"></Header>
      <Info></Info>
      <Tab></Tab>
      <Post></Post>
    </StyledProfile>
  );
}

export default Profile;
