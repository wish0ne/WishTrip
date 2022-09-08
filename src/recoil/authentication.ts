import { atom } from "recoil";

export interface IAuthTypes {
  email: string;
  password: string;
  nickname: string;
  name: string;
}

export const authState = atom<IAuthTypes>({
  key: "authentication/auth",
  default: {
    email: "",
    password: "",
    nickname: "",
    name: "",
  },
});
