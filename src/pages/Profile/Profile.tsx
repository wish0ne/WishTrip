import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import User from "../components/User";
import Tab from "../components/Tab";
import { useEffect, useState } from "react";
import instance from "../../modules/api";
import { useParams } from "react-router-dom";
import { GrowPost } from "../Search/Search";

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

const PostContainer = styled(GrowPost)``;

function Profile() {
  const { username } = useParams();
  const [info, setInfo] = useState({ username: "", icon: "" });
  const [posts, setPosts] = useState<
    { post_id: number; image: string; title: string; tags: string[] }[]
  >([]);
  useEffect(() => {
    //1.유저 정보 받기
    instance
      .get(`/msw/get_user_profile?username=${username}`)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        throw err;
      });

    //2. 유저 업로드 글 받기
    instance
      .get(`/msw/get_user_posts?username=${username}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const request = (id: string) => {
    if (id === "upload") {
      instance
        .get(`/get_user_posts?username=${username}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          throw err;
        });
    } else if (id === "comment") {
      instance
        .get(`/get_user_comments?username=${username}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <StyledProfile>
      <Header title="프로필"></Header>
      <Padding>
        <ProfileUser
          className="user"
          icon={info.icon}
          title={info.username}
          notMove
        />
        <Tab
          tabs={[
            { title: "업로드한 글", id: "upload" },
            { title: "댓글 단 글", id: "comment" },
          ]}
          request={request}
        />
        <PostContainer>
          {posts.map((post) => (
            <Post
              post_id={post.post_id}
              image={post.image}
              title={post.title}
              tags={post.tags}
              onClick={() => {}}
              key={post.post_id}
              grow={true}
            />
          ))}
        </PostContainer>
      </Padding>
    </StyledProfile>
  );
}

export default Profile;
