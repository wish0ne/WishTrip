import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Title from "./components/Title";
import Post from "../components/Post";
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

export const FixedPost = styled.div`
  display: flex;
  gap: 1.4rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 2rem 0;
`;

export const GrowPost = styled.div`
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

const RecentContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글인지 식별해주기 위한 정규표현식

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
      new_recent.push({
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
      .get("/get_popular_tags")
      .then(({ data }) => {
        setPopularTag(data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  //검색 결과
  useEffect(() => {
    //한글 쿼리라면 인코딩
    let api_query = query;
    if (query.match(check_kor)) {
      api_query = encodeURI(query); // 한글 인코딩
    }
    switch (menu) {
      case "포스트":
        instance
          .get(`/search_post?title=${api_query}`)
          .then(({ data }) => setSearchPost(data))
          .catch((err) => {
            setSearchPost([]);
            throw err;
          });
        break;
      case "태그":
        instance
          .get(`/search_tag?tag=${api_query}`)
          .then(({ data }) => setSearchTag(data))
          .catch((err) => {
            setSearchTag([]);
            throw err;
          });
        break;
      case "유저":
        instance
          .get(`/search_username?username=${api_query}`)
          .then(({ data }) => setSearchUser(data))
          .catch((err) => {
            setSearchUser([]);
            throw err;
          });
        break;
      case "장소":
        instance
          .get(`/search_location?location=${api_query}`)
          .then(({ data }) => setSearchLocation(data))
          .catch((err) => {
            setSearchLocation([]);
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
      <RecentContainer>
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
      </RecentContainer>
      {/* 지금 인기있는 태그 */}
      {!focus &&
        query === "" &&
        popularTag.map((item) => (
          <StyledTag key={item.id}>
            <Tag tag={item.tag} count={item.count}></Tag>
            <FixedPost>
              {item.posts.map(({ post_id, image, title, username }) => (
                <Post
                  key={post_id}
                  post_id={post_id}
                  image={image}
                  username={username}
                  title={title}
                  onClick={addRecent}
                  grow={false}
                ></Post>
              ))}
            </FixedPost>
          </StyledTag>
        ))}

      {query !== "" &&
        menu === "포스트" &&
        (search_post.length === 0 ? (
          <Empty />
        ) : (
          <GrowPost>
            {search_post.map(({ post_id, tag, image, title }) => (
              <Post
                key={post_id}
                post_id={post_id}
                image={image}
                title={title}
                tags={tag}
                onClick={addRecent}
                grow
              ></Post>
            ))}
          </GrowPost>
        ))}

      {query !== "" &&
        menu === "태그" &&
        (search_tag.length === 0 ? (
          <Empty />
        ) : (
          search_tag.map(({ id, tag, count, posts }) => (
            <StyledTag key={id}>
              <Tag tag={tag} count={count}></Tag>
              <FixedPost>
                {posts.map(({ post_id, image, title, username }) => (
                  <Post
                    key={post_id}
                    post_id={post_id}
                    image={image}
                    title={title}
                    username={username}
                    onClick={addRecent}
                    grow={false}
                  ></Post>
                ))}
              </FixedPost>
            </StyledTag>
          ))
        ))}

      {/* 장소 검색 결과 */}
      {query !== "" &&
        menu === "장소" &&
        (search_location.length === 0 ? (
          <Empty />
        ) : (
          <GrowPost>
            {search_location.map(({ post_id, tag, image, title }) => (
              <Post
                key={post_id}
                post_id={post_id}
                image={image}
                title={title}
                tags={tag}
                onClick={addRecent}
                grow
              ></Post>
            ))}
          </GrowPost>
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
