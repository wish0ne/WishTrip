import { atom } from "recoil";

export interface IMypageUserType {
  image: string | null;
  username: string;
  email: string;
}

interface IMypageContentsData {
  image: string;
  title: string;
  username: string;
  id: number;
}

export interface IMypageContentsType {
  [index: string]: IMypageContentsData[];
  scrap: IMypageContentsData[];
  recent: IMypageContentsData[];
  comment: IMypageContentsData[];
}

export const mypageUser = atom<IMypageUserType>({
  key: "mypage/mypageData/user",
  default: {
    image: null,
    username: "",
    email: "",
  },
});

export const mypageContents = atom<IMypageContentsType>({
  key: "mypage/mypageData/contents",
  default: { scrap: [], recent: [], comment: [] },
});
