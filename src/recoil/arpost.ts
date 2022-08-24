import { atom } from "recoil";

export const modalState = atom<string>({
  key: "arpost/modal",
  default: "none",
});
