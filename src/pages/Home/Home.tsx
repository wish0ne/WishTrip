import styled from "styled-components";
import Header from "./components/Header";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Event from "./components/Event";
import Recommend from "./components/Recommend";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  homeBanner,
  homeEvent,
  homeProfile,
  homeRecommend,
} from "../../recoil/home";
import { useEffect } from "react";
import instance from "../../modules/api";

const StyledHome = styled.div``;

const RecommendContainer = styled.div`
  padding: 4.8rem 2.4rem;
`;

function Home() {
  const recommend = useRecoilValue(homeRecommend);

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
