import styled from "styled-components";
import Header from "./components/Header";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Event from "./components/Event";
import Recommend from "./components/Recommend";
import instance from "../../modules/api";
import mobile from "../../assets/images/splash_mobile.png";
import pc from "../../assets/images/splash_pc.png";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  homeBanner,
  homeEvent,
  homeProfile,
  homeRecommend,
} from "../../recoil/home";
import { resolve } from "path";

const StyledHome = styled.div``;

const StyledSplash = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SplashImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
`;

const RecommendContainer = styled.div`
  padding: 4.8rem 2.4rem;
`;

function Home() {
  const setProfile = useSetRecoilState(homeProfile);
  const setBanner = useSetRecoilState(homeBanner);
  const setEvent = useSetRecoilState(homeEvent);
  const [recommend, setRecommend] = useRecoilState(homeRecommend);

  const [isSplash, setIsSplash] = useState<boolean>(true);

  function timer(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
  }

  useEffect(() => {
    Promise.allSettled([
      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      }),
      instance
        .get("/msw/home/profile")
        .then(({ data }) => {
          setProfile(data.icon);
        })
        .catch((err) => {
          setProfile(null);
          throw err;
        }),
      instance.get("/msw/home/banner").then(({ data }) => {
        setBanner(data);
      }),
      instance.get("/msw/home/event").then(({ data }) => {
        setEvent(data);
      }),
      instance.get("/msw/home/recommend").then(({ data }) => {
        setRecommend(data);
      }),
    ]).then((result) => {
      console.log(result);
      setIsSplash(false);
    });
  }, [setProfile, setBanner, setEvent, setRecommend]);

  if (isSplash) {
    return (
      <StyledSplash>
        {window.innerWidth > window.innerHeight ? (
          <SplashImage src={pc} alt="스플래시 이미지" />
        ) : (
          <SplashImage src={mobile} alt="스플래시 이미지" />
        )}
      </StyledSplash>
    );
  }
  return (
    <StyledHome>
      <Header />
      <Story />
      <Menu />
      <Event />
      <RecommendContainer>
        {recommend.map(({ tag, posts, id }) => (
          <Recommend tag={tag} posts={posts} key={id} />
        ))}
      </RecommendContainer>
    </StyledHome>
  );
}

export default Home;
