import styled from "styled-components";
import { useState } from "react";
import img1 from "../../../assets/images/여행사진1.jpg";
import img2 from "../../../assets/images/여행사진2.jpg";
import img3 from "../../../assets/images/여행사진3.jpg";
import { ReactComponent as Close } from "../../../assets/images/uil_multiply.svg";
import { ReactComponent as Empty } from "../../../assets/images/emoji_empty.svg";
import { ReactComponent as Shock } from "../../../assets/images/emoji_shock.svg";
import { ReactComponent as Crying } from "../../../assets/images/emoji_crying.svg";
import { ReactComponent as Heart } from "../../../assets/images/emoji_heart.svg";
import { ReactComponent as Thumb } from "../../../assets/images/emoji_thumb.svg";
import { ReactComponent as Laugh } from "../../../assets/images/emoji_laugh.svg";

const posts = [
  {
    id: 1,
    image: img1,
    body: "아직 휴가 못 가신 분~~!\n진짜 휴가는 지금부터~! 신나는 페스티벌이 기다리고 있어요 🎷\n라인업만 봐도 심장이 두근대는데요..\n마지막 여름 휴가 계획 중이시던 분들,\n이번 기회에 전주 여행도 함께 묶어서 JUMF 즐기고 오는 건 어떠신지요!\n티켓 무료 증정 이벤트도 진행 중이라니까 참여해보세요!\n❗️이벤트는 이 게시글이 아닌 JUMF 계정 @2022_jumf 팔로워 이벤트 게시물에서 참여하셔야 정상 접수 됩니다! (해당 계정에 이벤트 참여 게시글 고정되어 있어요)",
    emotions: { shock: 312, heart: 12, laugh: 1 },
    tags: ["부산", "치킨", "햄버거", "도미노피자"],
    user_img: img3,
    user_nickname: "부끄러운 프로도",
    date: "2022.08.02",
    comments: [
      {
        id: 1,
        user_img: img2,
        nickname: "신난 어피치",
        date: "2022.08.02",
        body: "여기 진짜 좋아요",
      },
      {
        id: 2,
        user_img: img3,
        nickname: "호기심 많은 어피치",
        date: "2022.07.22",
        body: "저도 가보고 싶어요!",
      },
    ],
  },
  {
    id: 2,
    image: img2,
    body: "여기는 꼭 다시 와야지~",
    emotions: { crying: 21, thumb: 12, laugh: 1 },
    tags: ["부산", "치킨", "햄버거", "도미노피자"],
    user_img: img1,
    user_nickname: "부끄러운 라이언",
    date: "2022.07.02",
    comments: [
      {
        id: 1,
        user_img: img1,
        nickname: "신난 어피치",
        date: "2022.07.22",
        body: "저도 가보고 싶어요!",
      },
    ],
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
      className="modal half"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ModalImage>
        <img src={posts[0].image} alt="AR 포스트 사진" />
        <Close
          width="2.4rem"
          height="2.4rem"
          fill="black"
          onClick={handleClose}
        />
      </ModalImage>
      <ModalContent>
        <address>
          <div>
            <img src={posts[0].user_img} alt="유저 아이콘" />
            <div>
              <h6>{posts[0].user_nickname}</h6>
              <span>{posts[0].date}</span>
            </div>
          </div>
          <Empty />
        </address>
        <Emotion>
          {posts[0].emotions.crying && (
            <div>
              <Crying />
              <span>{posts[0].emotions.crying}</span>
            </div>
          )}
          {posts[0].emotions.shock && (
            <div>
              <Shock />
              <span>{posts[0].emotions.shock}</span>
            </div>
          )}
          {posts[0].emotions.laugh && (
            <div>
              <Laugh />
              <span>{posts[0].emotions.laugh}</span>
            </div>
          )}
          {posts[0].emotions.thumb && (
            <div>
              <Thumb />
              <span>{posts[0].emotions.thumb}</span>
            </div>
          )}
          {posts[0].emotions.heart && (
            <div>
              <Heart />
              <span>{posts[0].emotions.heart}</span>
            </div>
          )}
        </Emotion>
        <article>{posts[0].body}</article>
        <span>#{posts[0].tags.join(" #")}</span>
        <CommentInput>
          <img src={img1} alt="유저 아이콘" />
          <input placeholder="댓글 달기.." type="text" />
        </CommentInput>
        <Comments>
          {posts[0].comments.map((comment) => (
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
    </StyledModal>
  );
}

export default Modal;
