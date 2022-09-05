import styled from "styled-components";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import instance from "../../../modules/api";
import { AxiosError } from "axios";

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
  font-weight: bold;
  display: block;
  font-family: "ExtraBold";
  width: 100%;
`;

interface ButtonPropsType {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

function Button({ type, setType }: ButtonPropsType) {
  const navigate = useNavigate();

  //Mutations
  const { data, mutate, isSuccess } = useMutation<any, AxiosError, string>(
    (url: string) => {
      if (url === "login")
        return instance.post(`/login`, { username: "test", password: "test" });
      else return instance.post(`/register`, {});
    },
  );

  const handleClick = () => {
    if (type === "email") {
      setType("password");
    } else if (type === "password") {
      localStorage.setItem("accessToken", "token");
      //mutate("login");
      navigate("../Home");
    } else {
      mutate("register");
      navigate("../Home");
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem("accessToken", data.access_token);
  //     navigate("../Home");
  //   }
  // }, [data, navigate]);

  return (
    <StyledButton>
      {type === "password" && <LostBtn>비밀번호를 잊으셨나요?</LostBtn>}
      <BottomButton onClick={handleClick}>
        {type === "email" && "다음"}
        {type === "password" && "로그인"}
        {type === "register" && "가입하기"}
      </BottomButton>
    </StyledButton>
  );
}

export default Button;
