import styled from "styled-components";
import Header from "./components/Header";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Event from "./components/Event";
import Recommend from "./components/Recommend";
import instance from "../../modules/api";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { homeBanner, homeProfile } from "../../recoil/home";

const StyledHome = styled.div``;

function Home() {
  const setProfile = useSetRecoilState(homeProfile);
  const setBanner = useSetRecoilState(homeBanner);
  useEffect(() => {
    instance.post("/msw/home/profile").then(({ data }) => {
      setProfile(data.profile);
    });
    instance.post("/msw/home/banner").then(({ data }) => {
      setBanner(data);
    });
  }, [setProfile, setBanner]);
  return (
    <StyledHome>
      <Header />
      <Story />
      <Menu />
      <Event />
      <Recommend />
    </StyledHome>
  );
}

export default Home;
