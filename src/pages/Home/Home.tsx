import styled from "styled-components";
import Header from "./components/Header";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Event from "./components/Event";
import Recommend from "./components/Recommend";
import instance from "../../modules/api";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  homeBanner,
  homeEvent,
  homeProfile,
  homeRecommend,
} from "../../recoil/home";

const StyledHome = styled.div``;

function Home() {
  const setProfile = useSetRecoilState(homeProfile);
  const setBanner = useSetRecoilState(homeBanner);
  const setEvent = useSetRecoilState(homeEvent);
  const [recommend, setRecommend] = useRecoilState(homeRecommend);
  useEffect(() => {
    instance
      .get("/msw/home/profile")
      .then(({ data }) => {
        setProfile(data.icon);
      })
      .catch((err) => {
        setProfile(null);
        throw err;
      });
    instance.get("/msw/home/banner").then(({ data }) => {
      setBanner(data);
    });
    instance.get("/msw/home/event").then(({ data }) => {
      setEvent(data);
    });
    instance.get("/msw/home/recommend").then(({ data }) => {
      setRecommend(data);
    });
  }, [setProfile, setBanner, setEvent, setRecommend]);
  return (
    <StyledHome>
      <Header />
      <Story />
      <Menu />
      <Event />
      {recommend.map(({ tag, posts, id }) => (
        <Recommend tag={tag} posts={posts} key={id} />
      ))}
    </StyledHome>
  );
}

export default Home;
