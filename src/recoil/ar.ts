import { atom } from "recoil";

interface IARCreatePostType {
  file: File | null; //AR 이미지
  image: File | null; //원본 이미지
  body: string;
  title: string; //제목
  x: number;
  y: number;
  z: number;
  tags: string[];
  date: Date | null;
}

export const arCreatePost = atom<IARCreatePostType>({
  key: "ar/arCreatePost",
  default: {
    file: null,
    image: null,
    body: "",
    title: "",
    x: 0,
    y: 0,
    z: 0,
    tags: [],
    date: null,
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

export const arId = atom<number | null>({
  key: "ar/arId",
  default: null,
});
