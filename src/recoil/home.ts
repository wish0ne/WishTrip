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

export interface IHomeEventData {
  location: string;
  type: string;
  id: number;
}

export const homeEvent = atom<IHomeEventData[]>({
  key: "home/event",
  default: [],
});

export interface RecommendContentData {
  image: string;
  profile: string;
  username: string;
  location: string;
  title: string;
  id: number;
}

export interface IHomeRecommendData {
  id: number;
  tag: string;
  contents: RecommendContentData[];
}

export const homeRecommend = atom<IHomeRecommendData[]>({
  key: "home/recommend",
  default: [],
});
