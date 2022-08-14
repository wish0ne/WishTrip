import styled from "styled-components";
import img1 from "../../../assets/images/여행사진1.jpg";
import img2 from "../../../assets/images/여행사진2.jpg";

const StyledStory = styled.div`
  height: 47.2rem;
  margin: 0.4rem 0.75rem 0;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
`;

const Tag = styled.span`
  border-bottom: solid 0.3rem;
`;

const Title = styled.span`
  position: absolute;
  font-family: "ExtraBold";
  font-size: 2.4rem;
  color: ${(props) => props.theme.palette.primary3};
  top: 2.4rem;
  left: 2.4rem;
  white-space: pre-line;
  line-height: 3.7rem;
`;

const Bottom = styled.div`
  position: absolute;
  left: 1.2rem;
  bottom: 2.9rem;
  display: flex;
`;
const User = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  margin-right: 1rem;
`;
const Name = styled.span`
  font-family: "ExtraBold";
  color: #ffffff;
  font-size: 1.4rem;
`;
const Location = styled.span`
  font-family: "Medium";
  color: #ffffff;
  font-size: 1.3rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Story() {
  return (
    <StyledStory>
      <Image src={img2} />
      <Title>
        <Tag>로맨틱한</Tag> 곳<br /> 어때요?
      </Title>
      <Bottom>
        <User src={img1} />
        <Info>
          <Name>부끄러운 프로도</Name>
          <Location>@제주 애월읍</Location>
        </Info>
      </Bottom>
    </StyledStory>
  );
}

export default Story;
