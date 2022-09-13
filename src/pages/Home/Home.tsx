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
    instance.post("/msw/home/profile").then(({ data }) => {
      setProfile(data.profile);
    });
    instance.post("/msw/home/banner").then(({ data }) => {
      setBanner(data);
    });
    instance.post("/msw/home/event").then(({ data }) => {
      setEvent(data);
    });
    instance.post("/msw/home/recommend").then(({ data }) => {
      setRecommend(data);
    });
  }, [setProfile, setBanner, setEvent, setRecommend]);
  return (
    <StyledHome>
      <Header />
      <Story />
      <Menu />
      <Event />
      {recommend.map(({ tag, contents, id }) => (
        <Recommend tag={tag} contents={contents} key={id} />
      ))}
    </StyledHome>
  );
}

export default Home;
