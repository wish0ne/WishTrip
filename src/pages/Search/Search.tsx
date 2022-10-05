import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import Post from "./components/Post";
import Tag from "./components/Tag";
import Recent from "./components/Recent";
import User from "./components/User";
import Empty from "./components/Empty";
import instance from "../../modules/api";
import { useRecoilState } from "recoil";
import {
  searchLocation,
  searchPopularTag,
  searchPost,
  searchTag,
  searchUser,
} from "../../recoil/search";

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
  justify-content: space-between;
`;

function Search() {
  const [focus, setFocus] = useState<boolean>(false); //input focus 여부
  const [query, setQuery] = useState<string>(""); //검색어
  const [menu, setMenu] = useState<string>("포스트"); //검색 메뉴

  //인기 태그
  const [popularTag, setPopularTag] = useRecoilState(searchPopularTag);
  //포스트 검색 결과
  const [search_post, setSearchPost] = useRecoilState(searchPost);
  //태그 검색 결과
  const [search_tag, setSearchTag] = useRecoilState(searchTag);
  //장소 검색 결과
  const [search_location, setSearchLocation] = useRecoilState(searchLocation);
  //유저 검색 결과
  const [search_user, setSearchUser] = useRecoilState(searchUser);

  //지금 인기 태그
  useEffect(() => {
    instance
      .get("msw/get_popular_tags")
      .then(({ data }) => {
        setPopularTag(data);
      })
      .catch((err) => {
        throw err;
      });
  }, [setPopularTag]);

  //검색 결과
  useEffect(() => {
    switch (menu) {
      case "포스트":
        instance
          .get(`msw/search_post?title=${query}`)
          .then(({ data }) => setSearchPost(data))
          .catch((err) => {
            throw err;
          });
        break;
      case "태그":
        instance
          .get(`msw/search_tag?tag=${query}`)
          .then(({ data }) => setSearchTag(data))
          .catch((err) => {
            throw err;
          });
        break;
      case "유저":
        instance
          .get(`msw/search_username?username=${query}`)
          .then(({ data }) => setSearchUser(data))
          .catch((err) => {
            throw err;
          });
        break;
      case "장소":
        instance
          .get(`msw/search_location?location=${query}`)
          .then(({ data }) => setSearchLocation(data))
          .catch((err) => {
            throw err;
          });
        break;
    }
  }, [query, menu]);

  return (
    <StyledSearch>
      {/* <Header/> : 뒤로가기, input */}
      <Header
        focus={focus}
        setFocus={setFocus}
        setQuery={setQuery}
        query={query}
      ></Header>
      <Title focus={focus} query={query} menu={menu} setMenu={setMenu}></Title>

      {/* 최근 검색어 */}
      {focus &&
        query === "" &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => <Recent key={i}></Recent>)}

      {/* 지금 인기있는 태그 */}
      {!focus &&
        query === "" &&
        popularTag.map((item) => (
          <StyledTag key={item.id}>
            <Tag tag={item.tag} count={item.count}></Tag>
            <StyledPost>
              {item.posts.map(({ post_id, image, title, username }) => (
                <Post
                  key={post_id}
                  post_id={post_id}
                  image={image}
                  username={username}
                  title={title}
                ></Post>
              ))}
            </StyledPost>
          </StyledTag>
        ))}

      {query !== "" &&
        menu === "포스트" &&
        (search_post.length === 0 ? (
          <Empty />
        ) : (
          <SearchPost>
            {search_post.map(({ post_id, tag, image, title }) => (
              <Post
                key={post_id}
                post_id={post_id}
                image={image}
                title={title}
                tag={tag}
              ></Post>
            ))}
          </SearchPost>
        ))}

      {query !== "" &&
        menu === "태그" &&
        (search_tag.length === 0 ? (
          <Empty />
        ) : (
          search_tag.map(({ id, tag, count, posts }) => (
            <StyledTag key={id}>
              <Tag tag={tag} count={count}></Tag>
              <StyledPost>
                {posts.map(({ post_id, image, title, username }) => (
                  <Post
                    key={post_id}
                    post_id={post_id}
                    image={image}
                    title={title}
                    username={username}
                  ></Post>
                ))}
              </StyledPost>
            </StyledTag>
          ))
        ))}

      {/* 장소 검색 결과 */}
      {query !== "" &&
        menu === "장소" &&
        (search_location.length === 0 ? (
          <Empty />
        ) : (
          <SearchPost>
            {search_location.map(({ post_id, tag, image, title }) => (
              <Post
                key={post_id}
                post_id={post_id}
                image={image}
                title={title}
                tag={tag}
              ></Post>
            ))}
          </SearchPost>
        ))}

      {/* 유저 검색 결과 */}
      {query !== "" &&
        menu === "유저" &&
        (search_user.length === 0 ? (
          <Empty />
        ) : (
          search_user.map(({ id, username, count, icon }) => (
            <User key={id} username={username} count={count} icon={icon}></User>
          ))
        ))}
    </StyledSearch>
  );
}
export default Search;
