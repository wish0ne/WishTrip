import styled from "styled-components";
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
  return (
    <StyledSearch>
      <Header></Header>
    </StyledSearch>
  );
}
export default Search;
