import styled from "styled-components";
import { useState, useEffect } from "react";
import instance from "../../modules/api";
import Header from "../components/Header";
import User from "../components/User";
import Image from "./components/Image";
import Emotion from "./components/Emotion";
import Content from "./components/Content";
import Comment from "./components/Comment";
import { useParams } from "react-router-dom";
import CommentInput from "./components/CommentInput";
import { useRecoilState } from "recoil";
import { commentsState, postState } from "../../recoil/post";
import { ReactComponent as MenuIcon } from "../../assets/images/uil_ellipsis.svg";
import Menu, { ModalMenu, ModalContent } from "../components/Menu";

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

function Read() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [post, setPost] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentsState);
  const { postId } = useParams();
  useEffect(() => {
    //글 정보 받아오기
    instance
      .get(`/post/read?post_id=${postId}`, {
        headers: {
          authorization: false,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        throw err;
      });

    //댓글 정보 받아오기
    instance
      .get(`/post/read/comments?post_id=${postId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  return (
    <StyledRead>
      {post && (
        <>
          <Header title="화려한 곳 어때요?" />
          <ReadUser
            icon={post.icon}
            title="부끄러운 프로도"
            subtitle="1년 전"
            className="user"
          >
            <MenuIcon
              width="2rem"
              height="2rem"
              fill="rgb(205 205 205)"
              onClick={openMenu}
            />
          </ReadUser>
          <Image image={post.image}></Image>
          <Padding>
            <Emotion
              emotions={post.emotion}
              isScrap={post.isScrap}
              myEmotion={post.myEmotion}
            ></Emotion>
            <Content
              title={post.title}
              body={post.body}
              tags={post.tags}
            ></Content>
            <CommentInput post_id={postId} />
            {comments &&
              comments.map(({ icon, username, body, date, comment_id }) => (
                <Comment
                  icon={icon}
                  username={username}
                  body={body}
                  date={date}
                  key={comment_id}
                />
              ))}
          </Padding>
        </>
      )}
      {isOpenMenu && (
        <Menu>
          {[
            [
              {
                menu: "공유하기",
                handleClick: () => {},
              },
              {
                menu: "수정하기",
                handleClick: () => {},
              },
            ],
            [
              {
                menu: "취소",
                handleClick: () => {
                  setIsOpenMenu(false);
                },
              },
            ],
          ].map((menu) => (
            <ModalContent>
              {menu.map((tab) => (
                <ModalMenu onClick={tab.handleClick}>{tab.menu}</ModalMenu>
              ))}
            </ModalContent>
          ))}
        </Menu>
      )}
    </StyledRead>
  );
}

export default Read;
