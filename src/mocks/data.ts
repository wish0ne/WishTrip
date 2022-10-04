import { atom } from "recoil";
import img1 from "../assets/images/여행사진1.jpg";
import img2 from "../assets/images/여행사진2.jpg";
import img3 from "../assets/images/여행사진3.jpg";
import img4 from "../assets/images/여행사진4.jpg";
import img5 from "../assets/images/여행사진5.jpg";
import img6 from "../assets/images/여행사진6.jpg";
import img7 from "../assets/images/여행사진7.jpg";
import img8 from "../assets/images/여행사진8.jpg";

//마이페이지
//유저 프로필 수정 후 조회
export const mypageProfile = atom<string>({
  key: "mypage/profile",
  default: img1,
});
