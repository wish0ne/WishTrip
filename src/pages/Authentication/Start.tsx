import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import User from "../components/User";
import { useEffect, useState } from "react";
import instance from "../../modules/api";
import splash from "../../assets/images/splash_pc.png";

const StyledStart = styled.div`
  height: 100%;
  box-sizing: border-box;
`;

const Bottom = styled.div`
  box-sizing: border-box;
  padding: 2.4rem;
  h1 {
    margin-top: 1.2rem;
    font-family: "ExtraBold";
    font-size: 2.4rem;
    color: ${(props) => props.theme.palette.default2};
  }
  > div {
    padding: 0 0.8rem;
    margin-bottom: 4rem;
  }
`;

const Landing = styled.div`
  width: 100%;
  height: 60%;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledBtn = styled(Link)`
  display: block;
  border-radius: 1.6rem;
  text-align: center;
  line-height: 5.6rem;
  height: 5.6rem;
  background-color: ${(props) => props.theme.palette.primary2};
  font-family: "ExtraBold";
  font-size: 1.6rem;
  color: ${(props) => props.theme.palette.white};
  text-decoration: none;
  box-shadow: 0 0.8rem 1.6rem rgba(90, 192, 250, 0.28);
`;

const StartUser = styled(User)`
  position: absolute;
  bottom: 2.4rem;
  left: 2.4rem;
  & img {
    width: 4rem;
    height: 4rem;
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

function Start() {
  const [start, setStart] = useState({
    image: "",
    icon: null,
    username: "",
    location: "",
  });

  useEffect(() => {
    instance
      .get("msw/auth")
      .then((res) => {
        setStart(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <StyledStart>
      <Landing>
        <img src={start.image} alt="로그인 화면 여행 사진" />
        <StartUser
          icon={start.icon}
          title={start.username}
          subtitle={"@" + start.location}
          className="user"
        />
      </Landing>
      <Bottom>
        <div>
          <Logo width="6.9rem" height="2.2rem" />
          <h1>내 친구가 추천하는 여행</h1>
        </div>
        <StyledBtn to="../Email">이메일로 시작하기</StyledBtn>
      </Bottom>
    </StyledStart>
  );
}

export default Start;
