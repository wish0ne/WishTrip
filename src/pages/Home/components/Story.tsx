import styled, { keyframes } from "styled-components";
import { useState } from "react";
import useInterval from "../../../modules/useInterval";
import User from "../../components/User";
import { useRecoilValue } from "recoil";
import { homeBanner } from "../../../recoil/home";
import { useNavigate } from "react-router-dom";
import addRecentPost from "../../../modules/addRecentPost";

const StyledStory = styled.div`
  height: ${window.screen.width < 450
    ? document.body.offsetWidth * 1.25
    : 550}px;
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

const Pagination = styled.div<{ length: number }>`
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
    width: ${(props) => 100 / props.length - 2}%;
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

const StoryUser = styled(User)`
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 4rem;
    margin-right: 1rem;
  }
  & h1 {
    color: white;
    text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.8);
  }
  & h2 {
    color: white;
    font-size: 1.3rem;
    text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.8);
  }
`;

function Story() {
  const [index, setIndex] = useState<number>(0);
  const banner = useRecoilValue(homeBanner);
  const navigate = useNavigate();
  useInterval(
    () => setIndex((index) => (index === banner.length - 1 ? 0 : index + 1)),
    5000,
  );

  return (
    <StyledStory
      onClick={() => {
        addRecentPost(banner[index].post_id);
        navigate(`../Read/${banner[index].post_id}`);
      }}
    >
      {banner.length > 0 && (
        <>
          <Image src={banner[index].image} alt="홈화면 상단 이미지" />
          <Title>
            <Tag>{banner[index].tag}</Tag> 곳<br /> 어때요?
          </Title>
          <Bottom>
            <StoryUser
              icon={banner[index].icon}
              title={banner[index].username}
              subtitle={"@" + banner[index].location}
              className="user"
            />
          </Bottom>
          <Pagination length={banner.length}>
            {banner.map((value, idx) => {
              return (
                <div>
                  <div className={index === idx ? "current" : ""} />
                </div>
              );
            })}
          </Pagination>
        </>
      )}
    </StyledStory>
  );
}

export default Story;
