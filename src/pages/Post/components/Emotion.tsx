import styled from "styled-components";
import { ReactComponent as Shock } from "../../../assets/images/emoji_shock.svg";
import { ReactComponent as Crying } from "../../../assets/images/emoji_crying.svg";
import { ReactComponent as Heart } from "../../../assets/images/emoji_heart.svg";
import { ReactComponent as Thumb } from "../../../assets/images/emoji_thumb.svg";
import { ReactComponent as Laugh } from "../../../assets/images/emoji_laugh.svg";

const StyledEmotion = styled.div``;

const EmotionContainer = styled.div`
  display: flex;
  gap: 0 1.2rem;
  & div {
    display: flex;
    align-items: center;
    span {
      font-family: "ExtraBold";
      font-size: 1.2rem;
      line-height: 1.6rem;
      color: ${(props) => props.theme.palette.default2};
      margin-left: 0.4rem;
    }
  }
`;

function Emotion({
  emotions,
}: {
  emotions: {
    shock: number;
    heart: number;
    laugh: number;
    crying: number;
    thumb: number;
  };
}) {
  return (
    <StyledEmotion>
      <EmotionContainer>
        {emotions.crying !== 0 && (
          <div>
            <Crying width="2rem" height="2rem" />
            <span>{emotions.crying}</span>
          </div>
        )}
        {emotions.shock !== 0 && (
          <div>
            <Shock width="2rem" height="2rem" />
            <span>{emotions.shock}</span>
          </div>
        )}
        {emotions.laugh !== 0 && (
          <div>
            <Laugh width="2rem" height="2rem" />
            <span>{emotions.laugh}</span>
          </div>
        )}
        {emotions.thumb !== 0 && (
          <div>
            <Thumb width="2rem" height="2rem" />
            <span>{emotions.thumb}</span>
          </div>
        )}
        {emotions.heart !== 0 && (
          <div>
            <Heart width="2rem" height="2rem" />
            <span>{emotions.heart}</span>
          </div>
        )}
      </EmotionContainer>
    </StyledEmotion>
  );
}

export default Emotion;
