import { atom } from "recoil";

export const arCreateTags = atom<string[]>({
  key: "ar/arCreateTags",
  default: [],
});
