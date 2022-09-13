import { atom } from "recoil";

export interface IMypageTypes {
  user: {
    image: string | null;
    username: string;
    email: string;
  };
  scrap: {
    image: string;
    title: string;
    username: string;
  }[];
  recent: {
    image: string;
    title: string;
    username: string;
  }[];
  comment: {
    image: string;
    title: string;
    username: string;
  }[];
}

export const mypageData = atom<IMypageTypes>({
  key: "mypage/mypageData",
  default: {
    user: {
      image: null,
      username: "",
      email: "",
    },
    scrap: [],
    recent: [],
    comment: [],
  },
});
