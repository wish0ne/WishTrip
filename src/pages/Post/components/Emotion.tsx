import styled from "styled-components";
import { ReactComponent as Shock } from "../../../assets/images/emoji_shock.svg";
import { ReactComponent as Crying } from "../../../assets/images/emoji_crying.svg";
import { ReactComponent as Heart } from "../../../assets/images/emoji_heart.svg";
import { ReactComponent as Thumb } from "../../../assets/images/emoji_thumb.svg";
import { ReactComponent as Laugh } from "../../../assets/images/emoji_laugh.svg";
import { ReactComponent as NotScrap } from "../../../assets/images/regular_bookmark.svg";
import { ReactComponent as Scrap } from "../../../assets/images/solid_bookmark.svg";
import { ReactComponent as Reaction } from "../../../assets/images/regular_heart.svg";
import { useEffect, useState } from "react";

const StyledEmotion = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const InteractionContainer = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  flex-grow: 1;
  justify-content: flex-end;
`;

interface IEmotionProps {
  emotions: {
    shock: number;
    heart: number;
    laugh: number;
    crying: number;
    thumb: number;
  };
  isScrap: boolean;
  myEmotion: string | null;
}

const StyledSelect = styled.div`
  position: absolute;
  right: -0.5rem;
  top: -1rem;
  background-color: white;
  box-shadow: 0 0.8rem 1.6rem rgba(153, 153, 153, 0.25);
  border-radius: 1.6rem;
  padding: 0.8rem 1rem;
  display: flex;
  gap: 1.5rem;
`;

const ReactionContainer = styled.div``;

function SelectEmotion({
  setEmotion,
  setIsSelect,
}: {
  setEmotion: React.Dispatch<React.SetStateAction<string | null>>;
  setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <StyledSelect onClick={() => setIsSelect(false)}>
      <Reaction width="2rem" height="2rem" onClick={() => setEmotion(null)} />
      <Crying width="2rem" height="2rem" onClick={() => setEmotion("crying")} />
      <Shock width="2rem" height="2rem" onClick={() => setEmotion("shock")} />
      <Laugh width="2rem" height="2rem" onClick={() => setEmotion("laugh")} />
      <Thumb width="2rem" height="2rem" onClick={() => setEmotion("thumb")} />
      <Heart width="2rem" height="2rem" onClick={() => setEmotion("heart")} />
    </StyledSelect>
  );
}

function Emotion({ emotions, isScrap, myEmotion }: IEmotionProps) {
  const [scrap, setScrap] = useState(isScrap);
  const [isSelect, setIsSelect] = useState(false);
  const [emotion, setEmotion] = useState(myEmotion);

  const handleScrap = () => {
    setScrap(!scrap);
  };
  const openSelect = () => {
    setIsSelect(true);
  };

  //반응 남기기
  useEffect(() => {
    console.log(emotion);
  }, [emotion]);

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
      <InteractionContainer>
        {scrap ? (
          <Scrap onClick={handleScrap} width="2rem" height="2rem" />
        ) : (
          <NotScrap onClick={handleScrap} width="2rem" height="2rem" />
        )}
        <ReactionContainer onClick={openSelect}>
          {!emotion && (
            <Reaction onClick={openSelect} width="2rem" height="2rem" />
          )}
          {emotion === "crying" && (
            <Crying onClick={openSelect} width="2rem" height="2rem" />
          )}
          {emotion === "laugh" && (
            <Laugh onClick={openSelect} width="2rem" height="2rem" />
          )}
          {emotion === "shock" && (
            <Shock onClick={openSelect} width="2rem" height="2rem" />
          )}
          {emotion === "heart" && (
            <Heart onClick={openSelect} width="2rem" height="2rem" />
          )}
          {emotion === "thumb" && (
            <Thumb onClick={openSelect} width="2rem" height="2rem" />
          )}
        </ReactionContainer>
        {isSelect && (
          <SelectEmotion setEmotion={setEmotion} setIsSelect={setIsSelect} />
        )}
      </InteractionContainer>
    </StyledEmotion>
  );
}

export default Emotion;
