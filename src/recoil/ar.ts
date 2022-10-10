import { atom } from "recoil";

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

export const arId = atom<number | null>({
  key: "ar/arId",
  default: null,
});
