import { atom } from "recoil";

interface PostReadProps {
  post_id: number;
  username: string;
  date: string;
  icon: string;
  image: string;
  emotion: {
    shock: number;
    heart: number;
    laugh: number;
    crying: number;
    thumb: number;
  };
  title: string;
  body: string;
  tags: string[];
  location: string;
  isWriter: boolean;
  isScrap: boolean;
  myEmotion: string | null;
}

interface PostCommentProps {
  comment_id: number;
  icon: string;
  username: string;
  body: string;
  date: string;
}

//포스트
export const postState = atom<PostReadProps>({
  key: "post/post",
  default: undefined,
});

//댓글
export const commentsState = atom<PostCommentProps[]>({
  key: "post/comments",
  default: [],
});
