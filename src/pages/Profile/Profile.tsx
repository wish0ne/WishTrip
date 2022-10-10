import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import User from "../components/User";
import img1 from "../../assets/images/여행사진1.jpg";

const StyledProfile = styled.div``;
const Padding = styled.div`
  padding: 0 2.4rem;
`;

const ProfileUser = styled(User)`
  margin: 2.4rem 0;
  & img {
    width: 7.2rem;
    height: 7.2rem;
  }
  & h1 {
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default2};
  }
`;
function Profile() {
  return (
    <StyledProfile>
      <Header title="프로필"></Header>
      <Padding>
        <ProfileUser className="user" icon={img1} title="부끄러운 프로도" />
        <Post></Post>
      </Padding>
    </StyledProfile>
  );
}

export default Profile;
