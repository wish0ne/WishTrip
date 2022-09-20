import { atom } from "recoil";

export const hashTagsAuto = atom<string[]>({
  key: "common/hashTagsAuto",
  default: [],
});
