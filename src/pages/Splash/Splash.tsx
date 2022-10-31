import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import mobile from "../../assets/images/splash_mobile.png";
import pc from "../../assets/images/splash_pc.png";
import { useSetRecoilState } from "recoil";
import {
  homeBanner,
  homeEvent,
  homeProfile,
  homeRecommend,
} from "../../recoil/home";
import instance from "../../modules/api";

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
  object-fit: fill;
`;

function Splash() {
  const setProfile = useSetRecoilState(homeProfile);
  const setBanner = useSetRecoilState(homeBanner);
  const setEvent = useSetRecoilState(homeEvent);
  const setRecommend = useSetRecoilState(homeRecommend);

  const navigate = useNavigate();
  useEffect(() => {
    Promise.allSettled([
      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      }),
      instance
        .get("/home/profile")
        .then(({ data }) => {
          setProfile(data.icon);
        })
        .catch((err) => {
          setProfile(null);
          throw err;
        }),
      instance.get("/home/banner").then(({ data }) => {
        setBanner(data);
      }),
      instance.get("/home/event").then(({ data }) => {
        setEvent(data);
      }),
      instance.get("/home/recommend").then(({ data }) => {
        setRecommend(data);
      }),
    ]).then((result) => {
      navigate("./Home");
    });
  }, [setProfile, setBanner, setEvent, setRecommend, navigate]);
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

export default Splash;
