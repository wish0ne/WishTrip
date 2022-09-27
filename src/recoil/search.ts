import { atom } from "recoil";

export const searchQuery = atom<string | null>({
  key: "search/query",
  default: null,
});
