import { atom } from "recoil";

export const homeProfile = atom<string>({
  key: "home/profile",
  default: "",
});

export interface IHomeBannerData {
  post_id: number;
  image: string;
  username: string;
  location: string;
  icon: string;
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
  icon: string;
  username: string;
  location: string;
  title: string;
  post_id: number;
}

export interface IHomeRecommendData {
  id: number;
  tag: string;
  posts: RecommendContentData[];
}

export const homeRecommend = atom<IHomeRecommendData[]>({
  key: "home/recommend",
  default: [],
});
