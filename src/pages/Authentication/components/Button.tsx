import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../../../modules/api";
import { useRecoilValue } from "recoil";
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
  font-weight: bold;
  display: block;
  font-family: "ExtraBold";
  width: 100%;
  padding: 0;
`;

interface ButtonPropsType {
  type: string;
}

function Button({ type }: ButtonPropsType) {
  const navigate = useNavigate();
  const auth = useRecoilValue<IAuthTypes>(authState);

  const handleClick = () => {
    if (type === "email") {
      const response = instance.post("msw/login", { email: auth.email });
      response
        .then((res) => {
          if (res.status === 200) navigate("../Password");
        })
        .catch(() => {
          navigate("../Register");
        });
    } else if (type === "password") {
      instance.post("/login", {
        username: auth.email,
        password: auth.password,
      });
      //mutate("login");
      //navigate("../Home");
    } else {
      navigate("../Home");
    }
  };

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
