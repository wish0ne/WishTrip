import { atom } from "recoil";

export interface IAuthTypes {
  data: {
    [key: string]: string;
    email: string;
    password: string;
    password_check: string;
    username: string;
    name: string;
  };
  agree: boolean;
  alert: {
    isMember: boolean;
    pwWrong: boolean;
    sameName: boolean;
    empty: boolean;
    pwEqual: boolean;
    noAgree: boolean;
  };
}

export const authState = atom<IAuthTypes>({
  key: "authentication/auth",
  default: {
    data: {
      email: "",
      password: "",
      password_check: "",
      username: "",
      name: "",
    },
    agree: false,
    alert: {
      isMember: true,
      pwWrong: false,
      sameName: false,
      empty: false,
      pwEqual: true,
      noAgree: false,
    },
  },
});
