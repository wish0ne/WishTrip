import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../../assets/images/tabler_arrow-left.svg";
import { useRecoilState } from "recoil";
import { searchQuery } from "../../../recoil/search";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.palette.inversed1};
  border: none;
  border-radius: 1.2rem;
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
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ focus, setFocus }: HeaderPropsType) {
  const [query, setQuery] = useRecoilState(searchQuery);
  const navigate = useNavigate();
  const handleFocus = () => setFocus(true); //input focus 설정

  //뒤로가기
  const handleClick = () => {
    //최근검색 or 검색결과 UI인 경우 -> 인기태그로 변경
    if (focus) {
      setFocus(false);
      setQuery("");
    }
    //인기태그인 경우 -> 홈화면으로 이동
    else {
      navigate(-1);
    }
  };
  return (
    <StyledHeader>
      <Arrow onClick={handleClick} width="2.4rem" height="2.4rem" />
      <Input
        type="text"
        placeholder="검색어를 입력해주세요"
        onFocus={handleFocus}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
    </StyledHeader>
  );
}
export default Header;
