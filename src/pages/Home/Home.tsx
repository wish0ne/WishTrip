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

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  /* 데스크탑 */
  @media screen and (min-width: 1024px) {
    padding-top: 8rem;
    flex-direction: row;
    width: 1024px;
  }
`;

const Container = styled.div`
  /* 데스크탑 */
  @media screen and (min-width: 1024px) {
    width: 70%;
  }
`;

const RecommendContainer = styled.div`
  padding: 4.8rem 2.4rem;
  /* 데스크탑 */
  @media screen and (min-width: 1024px) {
    width: 30%;
    padding: 0 2.4rem;
  }
`;

function Home() {
  const recommend = useRecoilValue(homeRecommend);
  const setProfile = useSetRecoilState(homeProfile);
  const setBanner = useSetRecoilState(homeBanner);
  const setEvent = useSetRecoilState(homeEvent);
  const setRecommend = useSetRecoilState(homeRecommend);

  useEffect(() => {
    instance
      .get("/home/profile")
      .then(({ data }) => {
        setProfile(data.icon);
      })
      .catch((err) => {
        setProfile(null);
        throw err;
      });
    instance.get("/home/banner").then(({ data }) => {
      setBanner(data);
    });
    instance.get("/home/event").then(({ data }) => {
      setEvent(data);
    });
    instance.get("/home/recommend").then(({ data }) => {
      setRecommend(data);
    });
  }, [setProfile, setBanner, setEvent, setRecommend]);

  return (
    <StyledHome>
      <Header />
      <Container>
        <Story />
        <Menu />
        <Event />
      </Container>
      <RecommendContainer>
        {recommend.map(({ tag, posts, id }) => (
          <Recommend tag={tag} posts={posts} key={id} />
        ))}
      </RecommendContainer>
    </StyledHome>
  );
}

export default Home;
