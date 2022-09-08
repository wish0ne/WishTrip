import styled from "styled-components";
import { authState } from "../../../recoil/authentication";
import { useRecoilState } from "recoil";

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
    setAuth({ ...auth, [e.target.id]: e.target.value });
  };
  return (
    <StyledInput>
      <input
        id={id}
        onChange={handleChange}
        type={type === "password" ? "password" : "email"}
      />
      <label>{title}</label>
    </StyledInput>
  );
}

export default Input;
