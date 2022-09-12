import styled from "styled-components";
import { authState } from "../../../recoil/authentication";
import { useRecoilState } from "recoil";

const Alert = styled.div`
  padding: 0.8rem 0;
  font-family: "Medium";
  font-size: 1.2rem;
  color: red;
`;

const StyledInput = styled.div`
  padding: 0.8rem 1.6rem;
  width: 100%;
  background-color: rgb(250 250 250);
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 1rem;

  label {
    font-family: "Medium";
    font-size: 1.2rem;
    color: ${(props) => props.theme.palette.inversed3};
    margin-bottom: 0.4rem;
  }

  input {
    border: none;
    background-color: transparent;
    font-family: "Medium";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default2};
    &:focus {
      outline: none;
    }
  }

  input:focus + label {
    color: ${(props) => props.theme.palette.primary2};
  }
`;

interface InputPropsType {
  title: string;
  type: string;
  id: string;
}

function Input({ title, type, id }: InputPropsType) {
  const [auth, setAuth] = useRecoilState(authState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key: string | undefined = e.target.dataset["auth"];
    if (key) {
      setAuth({
        data: {
          ...auth.data,
          [key]: e.target.value,
        },
        alert: {
          pwWrong: false,
          isMember: true,
        },
      });
    }
  };
  return (
    <>
      <StyledInput>
        <input data-auth={id} onChange={handleChange} type={type} />
        <label>{title}</label>
      </StyledInput>
      {!auth.alert.isMember && <Alert>등록되지 않은 이메일입니다.</Alert>}
      {auth.alert.pwWrong && <Alert>올바르지 않은 비밀번호입니다.</Alert>}
    </>
  );
}

export default Input;
