import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import User, { NoIcon, Info, Icon } from "../components/User";
import Tab from "../components/Tab";
import Post from "../components/Post";
import instance from "../../modules/api";
import { GrowPost } from "../Search/Search";
import { ReactComponent as Bar } from "../../assets/images/uil_bars.svg";
import { ReactComponent as Camera } from "../../assets/images/uil_camera.svg";
import { ReactComponent as Right } from "../../assets/images/uil_angle-right.svg";
import Menu, { ModalMenu, ModalContent } from "../components/Menu";
import { useNavigate } from "react-router-dom";

const StyledMypage = styled.div`
  padding: 0 2.4rem;
`;

const MypagePost = styled(Post)``;

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

const MypageUser = styled(User)`
  position: relative;
  margin-top: 2.4rem;
  justify-content: flex-start;
  ${Icon} {
    width: 7.2rem;
    height: 7.2rem;
  }
  ${NoIcon} {
    width: 7.2rem;
    height: 7.2rem;
  }
  ${Info} h1 {
    color: ${(props) => props.theme.palette.default2};
    font-size: 1.6rem;
  }
`;

const IconChange = styled.label`
  position: absolute;
  background-color: white;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 4rem;
  left: 5rem;
  bottom: 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const IconInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
  z-index: 10;
`;

export interface IMypageUserType {
  icon: string | null;
  username: string;
  email: string;
}

interface IMypageContentsData {
  image: string;
  title: string;
  tags: string[];
  post_id: number;
}

export interface IMypageContentsType {
  [index: string]: IMypageContentsData[];
  scrap: IMypageContentsData[];
  recent: IMypageContentsData[];
  comment: IMypageContentsData[];
  upload: IMypageContentsData[];
}

function Mypage() {
  const [user, setUser] = useState<IMypageUserType>({
    icon: "",
    username: "",
    email: "",
  });
  const [contents, setContents] = useState<IMypageContentsType>({
    scrap: [],
    recent: [],
    comment: [],
    upload: [],
  });
  const [tab, setTab] = useState("scrap"); //scrap, recent, comment
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    //유저 정보 받아오기
    if (token) {
      instance
        .get("/msw/mypage")
        .then(({ data }) => {
          setUser({
            icon: data.icon,
            email: data.email,
            username: data.username,
          });
        })
        .catch(() => {});
      //스크랩 한 글 받아오기
      instance.get(`/msw/mypage/${tab}`).then(({ data }) => {
        setContents({
          ...contents,
          [tab]: data,
        });
      });
    }
  }, []);

  const request = (id: string) => {
    setTab(id);
    if (id === "recent") {
      const id = localStorage.getItem("recent_post");
      if (id) {
        instance
          .get(`/msw/mypage/recent`, {
            params: {
              id: JSON.parse(id),
            },
          })
          .then(({ data }) => {
            setContents({
              ...contents,
              recent: data,
            });
          })
          .catch((err) => {
            throw err;
          });
      }
    } else {
      instance
        .get(`/msw/mypage/${id}`)
        .then(({ data }) => {
          setContents({
            ...contents,
            [id]: data,
          });
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  //메뉴 Modal 열기
  const openMenu = () => {
    setIsOpenMenu(true);
  };

  //유저 아이콘 변경
  const changeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      instance
        .put("msw/mypage/edit", { icon: e.target.files[0] })
        .then((res) => {})
        .catch((err) => {
          throw err;
        });
    }
  };

  //로그아웃
  const logOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    navigate("/Home");
  }, []);

  return (
    <StyledMypage>
      <Header title="마이페이지">
        <Bar width="2.4rem" height="2.4rem" onClick={openMenu} />
      </Header>
      {token ? (
        <MypageUser
          className="user"
          icon={user.icon}
          subtitle={user.email}
          title={user.username}
          notMove
        >
          <IconInput type="file" id="iconUpload" onChange={changeIcon} />
          <IconChange htmlFor="iconUpload">
            <Camera width="1.6rem" height="1.6rem" />
          </IconChange>
        </MypageUser>
      ) : (
        <MypageUser
          icon={null}
          title="로그인&가입하기"
          className="user"
          notMove
          onClick={() => navigate("../Authentication/Start")}
        >
          <Right width="2.4rem" height="2.4rem" fill="rgb(74, 74, 74)" />
        </MypageUser>
      )}
      <Tab
        tabs={[
          { title: "스크랩한 글", id: "scrap" },
          { title: "최근 본 글", id: "recent" },
          { title: "댓글 단 글", id: "comment" },
          { title: "업로드한 글", id: "upload" },
        ]}
        request={request}
      />
      {contents[tab].length > 0 ? (
        <GrowPost>
          {contents[tab].map((content) => (
            <MypagePost
              post_id={content.post_id}
              image={content.image!}
              title={content.title!}
              tags={content.tags}
              grow
              onClick={() => {}}
              key={content.post_id}
            />
          ))}
        </GrowPost>
      ) : (
        <NotLogin>{`지금 가입하고 친구들의 여행을\n둘러보세요.`}</NotLogin>
      )}
      {isOpenMenu && (
        <Menu>
          {[
            [
              {
                menu: "로그아웃",
                handleClick: () => {
                  logOut();
                },
              },
              {
                menu: "취소",
                handleClick: () => {
                  setIsOpenMenu(false);
                },
              },
            ],
          ].map((menu) => (
            <ModalContent key={menu[0].menu}>
              {menu.map((tab) => (
                <ModalMenu onClick={tab.handleClick} key={tab.menu}>
                  {tab.menu}
                </ModalMenu>
              ))}
            </ModalContent>
          ))}
        </Menu>
      )}
    </StyledMypage>
  );
}

export default Mypage;
