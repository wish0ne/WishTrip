import styled from "styled-components";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import User from "./components/User";
import Tab from "./components/Tab";
import Content from "./components/Content";
import instance from "../../modules/api";
import { useRecoilState } from "recoil";
import { mypageUser, mypageContents } from "../../recoil/mypage";

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
  const [user, setUser] = useRecoilState(mypageUser);
  const [contents, setContents] = useRecoilState(mypageContents);
  const [tab, setTab] = useState("scrap"); //scrap, recent, comment
  useEffect(() => {
    //유저 정보 받아오기
    instance
      .post("/msw/mypage")
      .then(({ data }) => {
        setUser({
          image: data.image,
          email: data.email,
          username: data.username,
        });
      })
      .catch(() => {
        //토큰 없는 경우
      });
    //스크랩 한 글 받아오기
    instance.post(`/msw/mypage/${tab}`).then(({ data }) => {
      setContents({
        ...contents,
        [tab]: data,
      });
    });
  }, []);
  return (
    <StyledMypage>
      <Header />
      <User />
      <Tab setTab={setTab} tab={tab} />
      {contents[tab].length > 0 ? (
        <StyledContent>
          {contents[tab].map((content) => (
            <Content
              image={content.image!}
              title={content.title!}
              user={content.username}
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
