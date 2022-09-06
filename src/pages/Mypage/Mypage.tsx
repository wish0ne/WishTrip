import styled from "styled-components";
import { useState } from "react";
import Header from "./components/Header";
import User from "./components/User";
import Tab from "./components/Tab";
import Content from "./components/Content";
import img1 from "../../assets/images/여행사진1.jpg";
import img2 from "../../assets/images/여행사진2.jpg";
import img3 from "../../assets/images/여행사진3.jpg";
import img4 from "../../assets/images/여행사진4.jpg";
import img5 from "../../assets/images/여행사진5.jpg";
import img6 from "../../assets/images/여행사진6.jpg";
import img7 from "../../assets/images/여행사진7.jpg";
import img9 from "../../assets/images/여행사진9.jpg";

const contents = [
  { id: 1, image: img5, title: "사소하지만 아름다운 풍경들", user: "gamsung" },
  { id: 2, image: img2, title: "새로생긴 핫 플레이스!", user: "샛별" },
  {
    id: 3,
    image: img6,
    title: "우당탕탕 여름 휴가",
    user: "행복한세상의족제비씨",
  },
  { id: 4, image: img9, title: "걷다가 만난 풍경", user: "여행러버" },
];

const StyledMypage = styled.div`
  padding: 0 2.4rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.6rem 0;
  gap: 1.6rem;
`;

const NotLogin = styled.div`
  padding: 3.2rem 0;
  text-align: center;
  font-family: "Medium";
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: ${(props) => props.theme.palette.default1};
  white-space: pre;
  margin: 1.6rem 0;
`;

function Mypage() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  return (
    <StyledMypage>
      <Header />
      <User isLogin={token ? true : false} />
      <Tab />
      {token ? (
        <StyledContent>
          {contents.map((content) => (
            <Content
              image={content.image}
              title={content.title}
              user={content.user}
              key={content.id}
            />
          ))}
        </StyledContent>
      ) : (
        <NotLogin>{`지금 가입하고 친구들의 여행을\n둘러보세요.`}</NotLogin>
      )}
    </StyledMypage>
  );
}

export default Mypage;