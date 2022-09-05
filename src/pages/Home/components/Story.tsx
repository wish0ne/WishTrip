import styled, { keyframes } from "styled-components";
import { useState } from "react";
import img1 from "../../../assets/images/여행사진1.jpg";
import img2 from "../../../assets/images/여행사진2.jpg";
import img3 from "../../../assets/images/여행사진3.jpg";
import img5 from "../../../assets/images/여행사진5.jpg";
import img6 from "../../../assets/images/여행사진6.jpg";
import img7 from "../../../assets/images/여행사진7.jpg";
import img8 from "../../../assets/images/여행사진9.jpg";
import useInterval from "../../../modules/useInterval";
import User from "../../components/User";

const stories = [
  {
    id: 2,
    tag: "상쾌한",
    image: img6,
    user: img3,
    name: "귀여운 라이언",
    location: "뉴질랜드 푸카키호수",
  },
  {
    id: 3,
    tag: "이색적인",
    image: img7,
    user: img5,
    name: "기타치는 튜브",
    location: "미국 오리건주 라벤더밸리",
  },
  {
    id: 4,
    tag: "요즘핫한",
    image: img8,
    user: img2,
    name: "멋쟁이 어피치",
    location: "프랑스 니스",
  },
  {
    id: 1,
    tag: "분위기 있는",
    image: img5,
    user: img1,
    name: "부끄러운 프로도",
    location: "미국 뉴욕",
  },
];

const StyledStory = styled.div`
  height: 47.2rem;
  margin: 0.4rem 0.75rem 0;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  object-fit: cover;
`;

const Tag = styled.span`
  border-bottom: solid 0.3rem;
`;

const Title = styled.span`
  position: absolute;
  font-family: "ExtraBold";
  font-size: 2.4rem;
  color: white;
  top: 2.4rem;
  left: 2.4rem;
  white-space: pre-line;
  line-height: 3.7rem;
  text-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.4);
`;

const Bottom = styled.div`
  position: absolute;
  left: 1.2rem;
  bottom: 2.9rem;
  display: flex;
`;
const progress = keyframes`
  from{
    width:0%;
  }
  to{
    width:100%;
  }
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 1.2rem;
  padding: 0 1.2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  & > div {
    height: 0.3rem;
    background-color: rgba(255, 255, 255, 0.7);
    width: 23%;
    border-radius: 0.2rem;
  }

  & div div.current {
    height: 100%;
    width: 0;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0.2rem;
    animation: ${progress} 5s linear;
  }
`;

function Story() {
  const [index, setIndex] = useState<number>(0);

  useInterval(() => setIndex((index) => (index === 3 ? 0 : index + 1)), 5000);

  return (
    <StyledStory>
      <Image src={stories[index].image} alt="홈화면 상단 이미지" />
      <Title>
        <Tag>{stories[index].tag}</Tag> 곳<br /> 어때요?
      </Title>
      <Bottom>
        <User
          icon={stories[index].user}
          name={stories[index].name}
          location={stories[index].location}
        />
      </Bottom>
      <Pagination>
        <div>
          <div className={index === 0 ? "current" : ""} />
        </div>
        <div>
          <div className={index === 1 ? "current" : ""} />
        </div>
        <div>
          <div className={index === 2 ? "current" : ""} />
        </div>
        <div>
          <div className={index === 3 ? "current" : ""} />
        </div>
      </Pagination>
    </StyledStory>
  );
}

export default Story;
