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
  children: React.ReactNode;
  type: string;
  id: string;
}

function Input({ children, type, id }: InputPropsType) {
  const [auth, setAuth] = useRecoilState(authState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({
      data: {
        ...auth.data,
        [id]: e.target.value,
      },
      agree: false,
      alert: {
        pwWrong: false,
        isMember: true,
        sameName: false,
        empty: false,
        pwEqual: true,
        noAgree: false,
      },
    });
  };
  return (
    <>
      <StyledInput>
        <input
          onChange={handleChange}
          type={type}
          id={id}
          value={auth.data[id]}
        />
        <label htmlFor={id}>{children}</label>
      </StyledInput>
    </>
  );
}

export default Input;
