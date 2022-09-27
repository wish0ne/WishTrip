import { atom } from "recoil";
import img1 from "../assets/images/경희대1.jpg";
import img3 from "../assets/images/여행사진3.jpg";
import img9 from "../assets/images/여행사진9.jpg";

interface IARCreatePostType {
  files: File | null;
  arpost_contents: string;
  x_value: number;
  y_value: number;
  z_value: number;
  tags: string[];
}

export const arCreatePost = atom<IARCreatePostType>({
  key: "ar/arCreatePost",
  default: {
    files: null,
    arpost_contents: "",
    x_value: 0,
    y_value: 0,
    z_value: 0,
    tags: [],
  },
});

//AR이미지용 태그(html2canvas ellipsis 미적용 버그 해결용)
export const arContentTag = atom<string[]>({
  key: "ar/arContentTag",
  default: [],
});

interface IARContentsType {
  id: number;
  x_value: number;
  y_value: number;
  z_value: number;
  image: string;
}

export const arContents = atom<IARContentsType[]>({
  key: "ar/arContents",
  default: [],
});

//delete
interface ARModal {
  id: number;
  image: string;
  body: string;
  emotions: {
    shock?: number;
    heart?: number;
    laugh?: number;
    crying?: number;
    thumb?: number;
  };
  tags: string[];
  user_img: string;
  user_nickname: string;
  date: string;
  comments: {
    id: number;
    user_img: string;
    nickname: string;
    date: string;
    body: string;
  }[];
}

export const arModal = atom<ARModal>({
  key: "ar/arModal",
  default: {
    id: 0,
    image: img1,
    body: "오늘은 경희대학교에 방문했어요! 정문이 너무 예뻐서 한 컷 찍어서 올립니다 😊 \n\n 혹시 경희대학교에 방문하신다면 제 포스트를 찾아보세요~",
    emotions: { shock: 312, heart: 12, laugh: 1 },
    tags: ["경희대학교", "학교투어"],
    user_img: img3,
    user_nickname: "부끄러운 프로도",
    date: "2022.08.02",
    comments: [
      {
        id: 0,
        user_img: img9,
        nickname: "신난 어피치",
        date: "2022.08.02",
        body: "사진이 너무 예뻐요",
      },
      {
        id: 1,
        user_img: img3,
        nickname: "호기심 많은 어피치",
        date: "2022.07.22",
        body: "저도 가보고 싶어요!",
      },
    ],
  },
});
