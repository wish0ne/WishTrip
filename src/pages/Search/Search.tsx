import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import Post from "./components/Post";
import Tag from "./components/Tag";
import Recent from "./components/Recent";
import User from "../components/User";
import Empty from "./components/Empty";
import instance from "../../modules/api";
import { useRecoilState } from "recoil";
import {
  searchLocation,
  searchPopularTag,
  searchPost,
  searchQuery,
  searchRecent,
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

const NewUser = styled(User)`
  margin-bottom: 2rem;
  & h1 {
    font-family: "Medium";
  }
  & h2 {
    color: ${(props) => props.theme.palette.inversed3};
  }
`;

function Search() {
  const [focus, setFocus] = useState<boolean>(false); //input focus 여부
  const [query, setQuery] = useRecoilState<string>(searchQuery); //검색어
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

  const [search_recent, setSearchRecent] = useRecoilState(searchRecent);

  //최근 검색어 추가 함수
  const addRecent = () => {
    //최근 검색어가 없었을 경우
    if (!search_recent) {
      const now_recent = JSON.stringify([
        { id: Date.now(), title: query, date: new Date().toLocaleDateString() },
      ]);
      localStorage.setItem("recent_search", now_recent);
      setSearchRecent(now_recent);
    } else {
      const new_recent = JSON.parse(search_recent).filter(
        (item: { id: number; title: string; date: Date }) =>
          item.title !== query,
      );
      new_recent.unshift({
        id: Date.now(),
        title: query,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem("recent_search", JSON.stringify(new_recent));
      setSearchRecent(JSON.stringify(new_recent));
    }
  };

  useEffect(() => {
    //최근 검색 결과 불러오기
    setSearchRecent(localStorage.getItem("recent_search"));

    //지금 인기 태그
    instance
      .get("msw/get_popular_tags")
      .then(({ data }) => {
        setPopularTag(data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

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
      <Header focus={focus} setFocus={setFocus}></Header>
      <Title focus={focus} menu={menu} setMenu={setMenu}></Title>

      {/* 최근 검색어 */}
      {focus &&
        query === "" &&
        search_recent !== null &&
        JSON.parse(search_recent).map(
          (recent: { id: number; title: string; date: Date }) => (
            <Recent
              key={recent.id}
              title={recent.title}
              date={recent.date}
            ></Recent>
          ),
        )}

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
                  addRecent={addRecent}
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
                addRecent={addRecent}
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
                    addRecent={addRecent}
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
                addRecent={addRecent}
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
            <NewUser
              className="user"
              key={id}
              title={username}
              subtitle={`게시물 ${count}`}
              icon={icon}
              onClick={addRecent}
            ></NewUser>
          ))
        ))}
    </StyledSearch>
  );
}
export default Search;
