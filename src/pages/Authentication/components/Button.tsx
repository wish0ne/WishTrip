import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../../../modules/api";
import { useRecoilState, useResetRecoilState } from "recoil";
import { authState, IAuthTypes } from "../../../recoil/authentication";

const StyledButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;
const LostBtn = styled.button`
  font-family: "SemiBold";
  font-size: 1.4rem;
  color: ${(props) => props.theme.palette.primary3};
  display: block;
  width: 100%;
  margin-bottom: 3.2rem;
  background: none;
  border: none;
  padding: 0;
`;
const BottomButton = styled.button`
  height: 5.6rem;
  background-color: rgb(14 182 254);
  border: none;
  color: white;
  font-size: 1.6rem;
  display: block;
  font-family: "ExtraBold";
  width: 100%;
  padding: 0;
`;

interface ButtonPropsType {
  type: string;
  title: string;
}

function Button({ type, title }: ButtonPropsType) {
  const navigate = useNavigate();
  const [{ data, alert, agree }, setAuth] =
    useRecoilState<IAuthTypes>(authState);
  const resetAuth = useResetRecoilState(authState);

  const handleClick = () => {
    //이메일로 시작하기
    if (type === "email") {
      if (data.email === "") {
        setAuth({ data, agree, alert: { ...alert, empty: true } });
      } else if (!alert.isMember) {
        setAuth({ data, agree, alert: { ...alert, empty: false } });
        navigate("../Register");
      } else {
        const response = instance.post("/isMember", {
          email: data.email,
        });
        response
          .then((res) => {
            //회원이면 비밀번호 입력으로 이동
            if (res.status === 200) navigate("../Password");
          })
          .catch(() => {
            //비회원이면 이메일로 가입하기로 유도
            setAuth({ data, agree, alert: { ...alert, isMember: false } });
          });
      }
    }
    //비밀번호 입력
    else if (type === "password") {
      if (data.password === "") {
        setAuth({ data, agree, alert: { ...alert, empty: true } });
      } else {
        const res = instance.post("/login", {
          email: data.email,
          password: data.password,
        });
        res
          .then((r) => {
            //로그인 성공 : 토큰 저장, 홈 화면 이동
            localStorage.setItem("accessToken", r.data.access_token);
            resetAuth();
            navigate("../../Home");
          })
          .catch(
            //실패 : 비밀번호 오류 알람 추가
            () => {
              setAuth({ data, agree, alert: { ...alert, pwWrong: true } });
            },
          );
      }
    }
    //회원가입
    else {
      if (
        data.username === "" ||
        data.name === "" ||
        data.password === "" ||
        data.password_check === ""
      ) {
        setAuth({ data, agree, alert: { ...alert, empty: true } });
      } else if (data.password !== data.password_check) {
        setAuth({ data, agree, alert: { ...alert, pwEqual: false } });
      } else if (!agree) {
        setAuth({ data, agree, alert: { ...alert, noAgree: true } });
      } else {
        const res = instance.post("/register", {
          username: data.username,
          name: data.name,
          email: data.email,
          password: data.password,
        });
        res
          .then((r) => {
            //회원가입 성공 : 로그인 화면으로 이동
            resetAuth();
            navigate("../Email");
          })
          .catch(
            //실패 : 닉네임 중복
            () => {
              setAuth({ data, agree, alert: { ...alert, sameName: true } });
            },
          );
      }
    }
  };

  return (
    <StyledButton>
      {type === "password" && <LostBtn>비밀번호를 잊으셨나요?</LostBtn>}
      <BottomButton onClick={handleClick}>{title}</BottomButton>
    </StyledButton>
  );
}

export default Button;
