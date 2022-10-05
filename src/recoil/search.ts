import { atom } from "recoil";

interface ISearchPopularTag {
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

export const searchPopularTag = atom<ISearchPopularTag[]>({
  key: "search/popularTag",
  default: [],
});
