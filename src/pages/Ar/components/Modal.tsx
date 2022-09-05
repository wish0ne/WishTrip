import styled from "styled-components";
import { useState } from "react";
import img1 from "../../../assets/images/경희대1.jpg";
import img2 from "../../../assets/images/경희대2.jpg";
import img3 from "../../../assets/images/여행사진3.jpg";
import img9 from "../../../assets/images/여행사진9.jpg";
import { ReactComponent as Close } from "../../../assets/images/uil_multiply.svg";
import { ReactComponent as Empty } from "../../../assets/images/emoji_empty.svg";
import { ReactComponent as Shock } from "../../../assets/images/emoji_shock.svg";
import { ReactComponent as Crying } from "../../../assets/images/emoji_crying.svg";
import { ReactComponent as Heart } from "../../../assets/images/emoji_heart.svg";
import { ReactComponent as Thumb } from "../../../assets/images/emoji_thumb.svg";
import { ReactComponent as Laugh } from "../../../assets/images/emoji_laugh.svg";
import { useRecoilValue } from "recoil";
import { arModal } from "../../../recoil/ar";

const posts = [
  {
    id: 0,
    image: img1,
    body: "오늘은 경희대학교에 방문했어요! 정문이 너무 예뻐서 한 컷 찍어서 올립니다 😊 \n\n 혹시 경희대학교에 방문하신다면 제 포스트를 찾아보세요~",
    emotions: { shock: 312, heart: 12, laugh: 1 },
    tags: ["경희대학교", "학교투어"],
    user_img: img3,
    user_nickname: "부끄러운 프로도",
    date: "2022.08.02",
    comments: [
      {
        id: 0,
        user_img: img9,
        nickname: "신난 어피치",
        date: "2022.08.02",
        body: "사진이 너무 예뻐요",
      },
      {
        id: 1,
        user_img: img3,
        nickname: "호기심 많은 어피치",
        date: "2022.07.22",
        body: "저도 가보고 싶어요!",
      },
    ],
  },
  {
    id: 1,
    image: img2,
    body: "저도 정문에서 한컷!",
    emotions: { crying: 0, thumb: 0, laugh: 0 },
    tags: ["경희대", "정문"],
    user_img: img9,
    user_nickname: "소마",
    date: "2022.08.25",
    comments: [],
  },
];

const StyledModal = styled.div`
  background-color: white;
  height: 0;
  position: fixed;
  bottom: 0;
  border-radius: 3.2rem 3.2rem 0 0;
  left: 0;
  right: 0;
  z-index: 3;
  transition: height 1s;
  overflow: auto;
  &.half {
    height: 50%;
    transition: height 1s;
  }
  &.full {
    height: 100%;
    transition: height 1s;
  }
`;

const ModalImage = styled.div`
  height: 70%;
  overflow-y: auto;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 3.2rem 3.2rem 0 0;
    object-fit: cover;
  }
  & svg {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
  }
`;

const ModalContent = styled.div`
  padding: 2rem 2.4rem;
  position: relative;
  & article {
    width: 100%;
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.default2};
    white-space: pre-line;
    margin: 2rem 0;
  }
  & span {
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.primary3};
  }
  & address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: normal;
    font-style: normal;
    & > div {
      display: flex;
      img {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 4rem;
        margin-right: 1rem;
      }
    }
    div > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h6 {
        margin: 0;
        font-family: "SemiBold";
        font-size: 1.4rem;
        color: ${(props) => props.theme.palette.default2};
      }
      span {
        font-family: "Medium";
        font-size: 1.2rem;
        color: ${(props) => props.theme.palette.default1};
      }
    }
  }
`;

const Emotion = styled.div`
  display: flex;
  gap: 0 1.2rem;
  margin-top: 1.6rem;
  & div {
    display: flex;
    align-items: center;
    span {
      font-family: "SemiBold";
      font-size: 1.2rem;
      color: ${(props) => props.theme.palette.default2};
      margin-left: 0.4rem;
    }
  }
`;

const CommentInput = styled.div`
  display: flex;
  margin: 2.8rem 0;
  & img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 4rem;
    margin-right: 1.2rem;
  }
  & input {
    border: none;
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.default2};
    flex-grow: 1;
  }
  & input:focus {
    outline: none;
  }
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem 0;
  & > div {
    display: flex;
  }
  & img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 4rem;
    margin-right: 1.2rem;
  }
  & div > div {
    display: flex;
    flex-direction: column;
    h6 {
      margin: 0;
      font-family: "ExtraBold";
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.default2};
    }
    span {
      font-family: "Medium";
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.default2};
    }
  }
`;

function Modal() {
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const posts = useRecoilValue(arModal);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    //const distanceX = e.changedTouches[0].pageX - touchPosition.x;
    const distanceY = touchPosition.y - e.changedTouches[0].pageY;
    console.log(distanceY);
    const modal = document.querySelector(".modal");

    //위로 슬라이드
    if (distanceY > 200) {
      modal.classList.remove("half");
      modal.classList.add("full");
    }

    //아래로 슬라이드
    else if (distanceY < -200) {
      if (modal.classList.contains("half")) {
        modal.classList.remove("half");
      } else {
        modal.classList.remove("full");
        modal.classList.add("half");
      }
    }
  };

  const handleClose = () => {
    console.log("close");
    const modal = document.querySelector(".modal");
    modal.classList.remove("half");
    modal.classList.remove("full");
  };
  return (
    <StyledModal
      className="modal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ModalImage>
        <img src={posts.image} alt="AR 포스트 사진" />
        <Close
          width="2.4rem"
          height="2.4rem"
          fill="rgb(0 134 231)"
          onClick={handleClose}
        />
      </ModalImage>
      <ModalContent>
        <address>
          <div>
            <img src={posts.user_img} alt="유저 아이콘" />
            <div>
              <h6>{posts.user_nickname}</h6>
              <span>{posts.date}</span>
            </div>
          </div>
          <Empty />
        </address>
        <Emotion>
          {posts.emotions.crying && (
            <div>
              <Crying />
              <span>{posts.emotions.crying}</span>
            </div>
          )}
          {posts.emotions.shock && (
            <div>
              <Shock />
              <span>{posts.emotions.shock}</span>
            </div>
          )}
          {posts.emotions.laugh && (
            <div>
              <Laugh />
              <span>{posts.emotions.laugh}</span>
            </div>
          )}
          {posts.emotions.thumb && (
            <div>
              <Thumb />
              <span>{posts.emotions.thumb}</span>
            </div>
          )}
          {posts.emotions.heart && (
            <div>
              <Heart />
              <span>{posts.emotions.heart}</span>
            </div>
          )}
        </Emotion>
        <article>{posts.body}</article>
        <span>#{posts.tags.join(" #")}</span>
        <CommentInput>
          <img src={img9} alt="유저 아이콘" />
          <input placeholder="댓글 달기.." type="text" />
        </CommentInput>
        <Comments>
          {posts.comments.map((comment) => (
            <div key={comment.id}>
              <img src={comment.user_img} alt="유저 아이콘" />
              <div>
                <h6>{comment.nickname}</h6>
                <span>{comment.body}</span>
              </div>
            </div>
          ))}
        </Comments>
      </ModalContent>
      )
    </StyledModal>
  );
}

export default Modal;
