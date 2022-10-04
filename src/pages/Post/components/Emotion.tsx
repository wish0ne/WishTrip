import styled from "styled-components";
import { ReactComponent as Shock } from "../../../assets/images/emoji_shock.svg";
import { ReactComponent as Crying } from "../../../assets/images/emoji_crying.svg";
import { ReactComponent as Heart } from "../../../assets/images/emoji_heart.svg";
import { ReactComponent as Thumb } from "../../../assets/images/emoji_thumb.svg";
import { ReactComponent as Laugh } from "../../../assets/images/emoji_laugh.svg";

const posts = {
  id: 0,
  body: "오늘은 경희대학교에 방문했어요! 정문이 너무 예뻐서 한 컷 찍어서 올립니다 😊 \n\n 혹시 경희대학교에 방문하신다면 제 포스트를 찾아보세요~",
  emotions: { shock: 312, heart: 12, laugh: 1, crying: 100, thumb: 100 },
  tags: ["경희대학교", "학교투어"],
};

const StyledEmotion = styled.div`
  padding: 2.4rem;
`;

const EmotionContainer = styled.div`
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

function Emotion() {
  return (
    <StyledEmotion>
      <EmotionContainer>
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
      </EmotionContainer>
    </StyledEmotion>
  );
}

export default Emotion;
