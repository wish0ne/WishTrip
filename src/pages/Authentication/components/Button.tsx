import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
  height: 5.6rem;
  background-color: rgb(14 182 254);
  position: absolute;
  border: none;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
`;

interface ButtonPropsType {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

function Button(props: ButtonPropsType) {
  const { type, setType } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    if (type === "login") {
      setType("password");
    } else if (type === "password") {
      navigate("../Home");
    } else {
      navigate("../Home");
    }
  };
  return <StyledButton onClick={handleClick}>다음</StyledButton>;
}

export default Button;
