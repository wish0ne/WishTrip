import styled from "styled-components";
import { useState } from "react";
import Image from "../../Post/components/Image";
import Emotion from "../../Post/components/Emotion";
import Content from "../../Post/components/Content";
import Comment from "../../Post/components/Comment";
import CommentInput from "../../Post/components/CommentInput";
import { ReactComponent as Close } from "../../../assets/images/uil_multiply.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import User from "../../components/User";
import { commentsState, postState } from "../../../recoil/post";
import { arId } from "../../../recoil/ar";

const StyledModal = styled.div<{ size: string }>`
  background-color: white;
  height: ${(props) =>
    props.size === "half" ? "50%" : props.size === "full" ? "100%" : "0"};
  position: fixed;
  bottom: 0;
  border-radius: 3.2rem 3.2rem 0 0;
  left: 0;
  right: 0;
  z-index: 3;
  transition: height 1s;
  overflow: auto;
`;

const ModalImage = styled.div`
  height: 70%;
  position: relative;
  overflow-y: hidden;
  & svg {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
  }
`;

const ModalContent = styled.div`
  padding: 2rem 2.4rem;
`;

const MImage = styled(Image)`
  height: 100%;
  & img {
    border-radius: 3.2rem 3.2rem 0 0;
  }
`;
const ModalUser = styled(User)`
  margin-bottom: 2rem;
`;

function Modal() {
  const [size, setSize] = useState("half");
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    //const distanceX = e.changedTouches[0].pageX - touchPosition.x;
    const distanceY = touchPosition.y - e.changedTouches[0].pageY;

    //위로 슬라이드
    if (distanceY > 200) {
      setSize("full");
    }

    //아래로 슬라이드
    else if (distanceY < -200) {
      if (size === "half") {
        setSize("");
      } else {
        setSize("half");
      }
    }
  };

  const handleClose = () => {
    setArId(null);
    setSize("");
  };

  const [post, setPost] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentsState);
  const [ar_id, setArId] = useRecoilState(arId); //ar 포스트 id
  return (
    <StyledModal
      size={size}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ModalImage>
        <MImage image={post.icon} />
        <Close
          width="2.4rem"
          height="2.4rem"
          fill="rgb(0 134 231)"
          onClick={handleClose}
        />
      </ModalImage>
      <ModalContent>
        <ModalUser
          icon={post.icon}
          title="부끄러운 프로도"
          subtitle="1년 전"
          className="user"
        />
        <Emotion
          emotions={post.emotion}
          isScrap={post.isScrap}
          myEmotion={post.myEmotion}
        />
        <Content title={post.title} body={post.body} tags={post.tags} />
        {ar_id && <CommentInput post_id={String(ar_id)} />}
        {comments.map(({ icon, username, body, date }) => (
          <Comment
            icon={icon}
            username={username}
            body={body}
            date={date}
            key={username}
          />
        ))}
      </ModalContent>
    </StyledModal>
  );
}

export default Modal;
