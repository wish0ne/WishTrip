import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { searchQuery, searchRecent } from "../../../recoil/search";

const StyledTitle = styled.div`
  width: 100%;
  font-family: "SemiBold";
  font-size: 1.6rem;
  color: ${(props) => props.theme.palette.default1};
  margin-top: 2.4rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.button`
  font-family: "Medium";
  font-size: 1.3rem;
  color: ${(props) => props.theme.palette.primary3};
  background: none;
  border: none;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 0.8rem;
`;

const Button = styled.button<{ focus: boolean }>`
  font-family: "SemiBold";
  font-size: 1.4rem;
  color: ${(props) =>
    props.focus ? props.theme.palette.primary3 : props.theme.palette.default1};
  line-height: 1.8rem;
  background: none;
  border: none;
  padding: 0.8rem 0.6rem;
  text-align: center;
  border-bottom: 0.2rem solid;
  border-color: ${(props) =>
    props.focus ? props.theme.palette.primary3 : "transparent"};
  & + & {
    margin-left: 1.2rem;
  }
`;

interface TitlePropsType {
  focus: boolean;
  menu: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

function Title({ focus, menu, setMenu }: TitlePropsType) {
  const query = useRecoilValue(searchQuery);
  const setRecentSearch = useSetRecoilState(searchRecent);
  //검색 타입 변경
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const eventTarget = e.target as HTMLElement;
    setMenu(eventTarget.innerText);
  };

  //최근 검색어 모두 삭제
  const handleDeleteAll = () => {
    localStorage.setItem("recent_search", JSON.stringify([]));
    setRecentSearch(JSON.stringify([]));
  };

  if (focus && query === "") {
    return (
      <StyledTitle>
        <span>최근 검색</span>
        <Delete onClick={() => handleDeleteAll()}>모두 삭제</Delete>
      </StyledTitle>
    );
  }

  if (query === "")
    return (
      <StyledTitle>
        <span>지금 인기있는 태그</span>
      </StyledTitle>
    );

  return (
    //<StyledTitle>
    <Menu>
      {["포스트", "태그", "장소", "유저"].map((title) => {
        return (
          <Button focus={title === menu} onClick={handleClick} key={title}>
            {title}
          </Button>
        );
      })}
    </Menu>
    //</StyledTitle>
  );
}
export default Title;
