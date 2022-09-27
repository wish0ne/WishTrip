import styled from "styled-components";
import { useState } from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import Post from "./components/Post";
import Tag from "./components/Tag";
import User from "./components/User";
import Location from "./components/Location";

const StyledSearch = styled.div`
  padding: 2rem;
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
    </StyledSearch>
  );
}
export default Search;
