import { atom } from "recoil";

interface ISearchTag {
  id: number;
  tag: string;
  count: number;
  posts: {
    post_id: number;
    image: string;
    title: string;
    username: string;
  }[];
}

//지금 인기 태그 데이터
export const searchPopularTag = atom<ISearchTag[]>({
  key: "search/popularTag",
  default: [],
});

interface ISearchPost {
  post_id: number;
  tag: string[];
  image: string;
  title: string;
}

//포스트 검색 결과
export const searchPost = atom<ISearchPost[]>({
  key: "search/post",
  default: [],
});

//태그 검색 결과
export const searchTag = atom<ISearchTag[]>({
  key: "search/tag",
  default: [],
});

//장소 검색 결과
export const searchLocation = atom<ISearchPost[]>({
  key: "search/location",
  default: [],
});

interface ISearchUser {
  id: number;
  username: string;
  count: number;
  icon: string;
}

//유저 검색 결과
export const searchUser = atom<ISearchUser[]>({
  key: "search/user",
  default: [],
});

//검색 쿼리
export const searchQuery = atom<string>({
  key: "search/query",
  default: "",
});

//최근 검색어
export const searchRecent = atom<string | null>({
  key: "search/recent",
  default: "",
});
