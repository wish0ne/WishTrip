import styled from "styled-components";
import { useState, useEffect } from "react";
import instance from "../../modules/api";
import Header from "../components/Header";
import User from "../components/User";
import Image from "./components/Image";
import Emotion from "./components/Emotion";
import Content from "./components/Content";
import Comment from "./components/Comment";
import img1 from "../../assets/images/여행사진1.jpg";
import { useParams } from "react-router-dom";
import CommentInput from "./components/CommentInput";

const StyledRead = styled.div``;

const ReadUser = styled(User)`
  padding: 2rem 2.4rem 1.6rem;
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

const Padding = styled.div`
  padding: 2.4rem;
`;

interface PostReadProps {
  username: string;
  date: Date;
  icon: string;
  image: string;
  emotion: {
    shock: number;
    heart: number;
    laugh: number;
    crying: number;
    thumb: number;
  };
  title: string;
  body: string;
  tags: string[];
  location: string;
  isWriter: boolean;
  isScrap: boolean;
  myEmotion: string | null;
}

interface PostCommentProps {
  id: number;
  icon: string;
  username: string;
  body: string;
  date: Date;
}

function Read() {
  const [post, setPost] = useState<PostReadProps>();
  const [comments, setComments] = useState<PostCommentProps[]>([]);
  const { postId } = useParams();
  useEffect(() => {
    //글 정보 받아오기
    instance
      .get(`msw/post/read/?id=${postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        throw err;
      });

    //댓글 정보 받아오기
    instance
      .get(`msw/post/read/comments?id=${postId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <StyledRead>
      {post && (
        <>
          <Header title="화려한 곳 어때요?"></Header>
          <ReadUser
            icon={img1}
            title="부끄러운 프로도"
            subtitle="1년 전"
            className="user"
          />
          <Image image={post.image}></Image>
          <Padding>
            <Emotion emotions={post.emotion}></Emotion>
            <Content
              title={post.title}
              body={post.body}
              tags={post.tags}
            ></Content>
            <CommentInput />
            {comments.map(({ icon, username, body, date }) => (
              <Comment
                icon={icon}
                username={username}
                body={body}
                date={date}
              />
            ))}
          </Padding>
        </>
      )}
    </StyledRead>
  );
}

export default Read;
