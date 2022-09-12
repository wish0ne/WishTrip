import { atom } from "recoil";

export interface IAuthTypes {
  data: {
    email: string;
    password: string;
    password_check: string;
    nickname: string;
    name: string;
  };
  alert: {
    isMember: boolean;
    pwWrong: boolean;
  };
}

export const authState = atom<IAuthTypes>({
  key: "authentication/auth",
  default: {
    data: {
      email: "",
      password: "",
      password_check: "",
      nickname: "",
      name: "",
    },
    alert: {
      isMember: true,
      pwWrong: false,
    },
  },
});
