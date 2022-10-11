import { atom } from "recoil";

//유저 프로필(아이콘 이미지)
export const homeProfile = atom<string | null>({
  key: "home/profile",
  default: null,
});

//스토리 정보
export interface IHomeBannerData {
  post_id: number;
  image: string;
  username: string;
  location: string;
  icon: string;
  tag: string;
}

export const homeBanner = atom<IHomeBannerData[]>({
  key: "home/banner",
  default: [],
});

//이벤트 정보
export interface IHomeEventData {
  location: string;
  type: string;
  id: number;
}

export const homeEvent = atom<IHomeEventData[]>({
  key: "home/event",
  default: [],
});

//추천 포스트
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
