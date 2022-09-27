import styled from "styled-components";
import { useState } from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import Post from "./components/Post";
import Tag from "./components/Tag";
import Recent from "./components/Recent";
import User from "./components/User";
import Location from "./components/Location";

const StyledSearch = styled.div`
  padding: 2rem;
`;

const StyledTag = styled.div`
  margin-top: 2rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.palette.inversed2};
`;

const StyledPost = styled.div`
  display: flex;
  gap: 1.4rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 2rem 0;
`;

const SearchPost = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

function Search() {
  const [focus, setFocus] = useState<boolean>(false); //input focus 여부
  const [query, setQuery] = useState<string>(""); //검색어
  const [menu, setMenu] = useState<string>("포스트"); //검색 메뉴

  return (
    <StyledSearch>
      <Header
        focus={focus}
        setFocus={setFocus}
        setQuery={setQuery}
        query={query}
      ></Header>

      <Title focus={focus} query={query} menu={menu} setMenu={setMenu}></Title>
      {focus &&
        query === "" &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => <Recent key={i}></Recent>)}
      {!focus &&
        query === "" &&
        [1, 2, 3, 4, 5].map((item) => (
          <StyledTag key={item}>
            <Tag></Tag>
            <StyledPost>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Post key={item}></Post>
              ))}
            </StyledPost>
          </StyledTag>
        ))}
      {query !== "" && menu === "포스트" && (
        <SearchPost>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Post key={item}></Post>
          ))}
        </SearchPost>
      )}
      {query !== "" &&
        menu === "태그" &&
        [1, 2, 3, 4, 5].map((item) => (
          <StyledTag key={item}>
            <Tag key={item}></Tag>
            <StyledPost>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Post key={item}></Post>
              ))}
            </StyledPost>
          </StyledTag>
        ))}

      {query !== "" &&
        menu === "장소" &&
        [1, 2, 3, 4, 5].map((item) => <Location key={item}></Location>)}
      {query !== "" &&
        menu === "유저" &&
        [1, 2, 3, 4, 5].map((item) => <User key={item}></User>)}
    </StyledSearch>
  );
}
export default Search;
