import { atom } from "recoil";
import post from "../assets/images/image-download.png";

export const arCreateTags = atom<string[]>({
  key: "ar/arCreateTags",
  default: [],
});

interface ARPosts {
  id: number;
  latitude: number;
  longitude: number;
  image: string;
  position?: string;
}
export const arPosts = atom<ARPosts[]>({
  key: "ar/arPosts",
  default: [
    {
      id: 1,
      latitude: 37.247328,
      longitude: 127.078444,
      image: post,
      position: "0 200 0",
    },
  ],
});
