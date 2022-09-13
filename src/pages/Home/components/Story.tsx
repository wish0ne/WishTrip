import styled, { keyframes } from "styled-components";
import { useState } from "react";
import useInterval from "../../../modules/useInterval";
import User from "../../components/User";
import { useRecoilValue } from "recoil";
import { homeBanner } from "../../../recoil/home";

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
  const banner = useRecoilValue(homeBanner);

  useInterval(() => setIndex((index) => (index === 3 ? 0 : index + 1)), 5000);

  return (
    <StyledStory>
      {banner.length > 0 && (
        <>
          <Image src={banner[index].image} alt="홈화면 상단 이미지" />
          <Title>
            <Tag>{banner[index].comment}</Tag> 곳<br /> 어때요?
          </Title>
          <Bottom>
            <User
              icon={banner[index].profile}
              name={banner[index].username}
              location={banner[index].place}
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
        </>
      )}
    </StyledStory>
  );
}

export default Story;
