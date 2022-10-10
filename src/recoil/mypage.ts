import { atom } from "recoil";

export interface IMypageUserType {
  icon: string;
  username: string;
  email: string;
}

interface IMypageContentsData {
  image: string;
  title: string;
  tags: string[];
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
    icon: "",
    username: "",
    email: "",
  },
});

export const mypageContents = atom<IMypageContentsType>({
  key: "mypage/mypageData/contents",
  default: { scrap: [], recent: [], comment: [] },
});
