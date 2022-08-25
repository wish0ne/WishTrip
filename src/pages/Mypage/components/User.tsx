import styled from "styled-components";
import { useState } from "react";
import img2 from "../../../assets/images/여행사진2.jpg";
import { ReactComponent as Right } from "../../../assets/images/uil_angle-right.svg";

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  margin: 2.4rem 0;
  div + div {
    display: flex;
    align-items: center;
    span {
      font-family: "ExtraBold";
      font-size: 1.6rem;
      color: ${(props) => props.theme.palette.default1};
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
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const handleToLogin = () => {};
  return (
    <StyledUser>
      <Icon>
        {token ? <img src={img2} alt="마이페이지 유저 프로필사진" /> : <div />}
      </Icon>
      {token ? (
        <address>
          <span>부끄러운 프로도</span>
          <span>frodo@gmail.com</span>
        </address>
      ) : (
        <div>
          <span>로그인 & 가입하기</span>
          <Right width="2.4rem" height="2.4rem" onClick={handleToLogin} />
        </div>
      )}
    </StyledUser>
  );
}

export default User;
