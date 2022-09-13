import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Right } from "../../../assets/images/uil_angle-right.svg";
import { useRecoilValue } from "recoil";
import { mypageData } from "../../../recoil/mypage";

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  margin: 2.4rem 0;
  div + div {
    display: flex;
    align-items: center;
    height: 2.4rem;
    span {
      font-family: "ExtraBold";
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: ${(props) => props.theme.palette.default1};
    }
    > a {
      height: 2.4rem;
    }
  }
  & > address {
    display: flex;
    flex-direction: column;
    font-style: normal;
    span {
      font-family: "ExtraBold";
      font-size: 1.6rem;
      color: ${(props) => props.theme.palette.default2};
    }
    span + span {
      font-family: "Medium";
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.default1};
      margin-top: 0.4rem;
    }
  }
`;

const Icon = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 4rem;
  margin-right: 1.6rem;
  & > img {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 4rem;
  }
  & > div {
    width: 7.2rem;
    height: 7.2rem;
    border-radius: 4rem;
    background-color: ${(props) => props.theme.palette.inversed2};
  }
`;

function User() {
  const { user } = useRecoilValue(mypageData);
  return (
    <StyledUser>
      <Icon>
        {user.image ? (
          <img src={user.image} alt="마이페이지 유저 프로필사진" />
        ) : (
          //빈 프로필 사진
          <div />
        )}
      </Icon>
      {user.email !== "" ? (
        <address>
          <span>{user.username}</span>
          <span>{user.email}</span>
        </address>
      ) : (
        <div>
          <span>로그인 & 가입하기</span>
          <Link to="../Authentication/Start">
            <Right width="2.4rem" height="2.4rem" />
          </Link>
        </div>
      )}
    </StyledUser>
  );
}

export default User;
