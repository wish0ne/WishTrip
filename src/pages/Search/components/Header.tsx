import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../../assets/images/tabler_arrow-left.svg";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.palette.inversed1};
  border: none;
  font-family: "Medium";
  font-size: 1.4rem;
  line-height: 2.2rem;
  width: 100%;
  margin-left: 0.8rem;
  padding: 0.9rem 1.6rem;
  &:focus {
    outline: none;
  }
`;

interface HeaderPropsType {
  query: string;
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ query, focus, setFocus, setQuery }: HeaderPropsType) {
  const navigate = useNavigate();
  const handleFocus = () => setFocus(true);
  const handleClick = () => {
    if (focus) {
      setFocus(false);
      setQuery("");
    } else {
      navigate(-1);
    }
  };
  return (
    <StyledHeader>
      <Arrow onClick={handleClick} />
      <Input
        type="text"
        placeholder="검색어를 입력해주세요"
        onFocus={handleFocus}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </StyledHeader>
  );
}
export default Header;
