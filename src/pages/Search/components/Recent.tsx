import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../../assets/images/uil_multiply.svg";
import { searchQuery, searchRecent } from "../../../recoil/search";

const StyledRecent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
  > div {
    display: flex;
    flex-direction: column;
    font-family: "Medium";
    > h3 {
      font-size: 1.4rem;
      color: ${(props) => props.theme.palette.default1};
      margin-bottom: 0.2rem;
    }
    > span {
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.inversed3};
    }
  }
`;

function Recent({ title, date }: { title: string; date: Date }) {
  const [search_recent, setSearchRecent] = useRecoilState(searchRecent);
  const setQuery = useSetRecoilState(searchQuery);
  //최근 검색어 삭제
  const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    const new_recent = JSON.parse(search_recent!).filter(
      (item: { id: number; title: string; date: Date }) => item.title !== title,
    );
    setSearchRecent(JSON.stringify(new_recent));
    localStorage.setItem("recent_search", JSON.stringify(new_recent));
  };

  //최근 검색어로 검색
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    let query = e.currentTarget.dataset.query;
    if (query) setQuery(query);
  };

  return (
    <StyledRecent onClick={handleClick} data-query={title}>
      <div>
        <h3>{title}</h3>
        <span>{date.toString()}</span>
      </div>
      <Delete
        width="1.6rem"
        height="1.6rem"
        fill="rgb(205 205 205)"
        onClick={handleDelete}
      ></Delete>
    </StyledRecent>
  );
}
export default Recent;
