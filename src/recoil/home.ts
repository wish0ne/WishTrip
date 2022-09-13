import { atom } from "recoil";

export const homeProfile = atom<string>({
  key: "home/profile",
  default: "",
});

export interface IHomeBannerData {
  image: string;
  username: string;
  place: string;
  profile: string;
  comment: string;
}

export const homeBanner = atom<IHomeBannerData[]>({
  key: "home/banner",
  default: [],
});
