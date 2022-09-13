import { rest } from "msw";
import img1 from "../assets/images/여행사진1.jpg";
import img2 from "../assets/images/여행사진2.jpg";
import img3 from "../assets/images/여행사진3.jpg";
import img4 from "../assets/images/여행사진4.jpg";
import img5 from "../assets/images/여행사진5.jpg";
import img6 from "../assets/images/여행사진6.jpg";
import img7 from "../assets/images/여행사진7.jpg";
import img8 from "../assets/images/여행사진8.jpg";

interface PostValidUserReqBody {
  email: string;
  password?: string;
  name?: string;
  username?: string;
}

//method, path, function
//req : information about the captured request
//res : function to create the mocked response
//ctx : context utilities specific to the current request handler
export const handlers = [
  //인증
  rest.post<PostValidUserReqBody>(
    "https://3.36.71.48/msw/isMember",
    (req, res, ctx) => {
      const { email } = req.body;
      if (email === "test") return res(ctx.status(200));
      else return res(ctx.status(401));
    },
  ),
  rest.post<PostValidUserReqBody>(
    "https://3.36.71.48/msw/login",
    (req, res, ctx) => {
      const { email, password } = req.body;
      if (email === "test" && password === "1234")
        return res(
          ctx.status(200),
          ctx.json({
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE2NTk3ODU1Mjh9.kYGtPKWIjfxyDF_Ly0bgzIftYYqJS0-0bh44id1r4wM",
            token_type: "bearer",
          }),
        );
      else return res(ctx.status(401));
    },
  ),
  rest.post<PostValidUserReqBody>(
    "https://3.36.71.48/msw/register",
    (req, res, ctx) => {
      const { email, username } = req.body;
      if (email === "test" || username === "admin") {
        return res(ctx.status(401));
      } else {
        return res(ctx.status(200), ctx.json({ msg: "register success" }));
      }
    },
  ),
  //마이페이지
  rest.post("https://3.36.71.48/msw/mypage", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token === "null") return res(ctx.status(401)); //비로그인
    return res(
      ctx.json({
        image: img1,
        username: "부끄러운 프로도",
        email: "frodo@gmail.com",
      }),
    );
  }),
  rest.post("https://3.36.71.48/msw/mypage/scrap", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token === "null") return res(ctx.status(401)); //비로그인
    return res(
      ctx.json([
        {
          image: img2,
          title: "여행의 제목입니다.",
          username: "부끄러운 프로도",
          id: 1,
        },
        {
          image: img4,
          title: "여행의 제목입니다.",
          username: "부끄러운 프로도",
          id: 2,
        },
        {
          image: img6,
          title: "여행의 제목입니다.",
          username: "부끄러운 프로도",
          id: 3,
        },
        {
          image: img8,
          title: "여행의 제목입니다.",
          username: "부끄러운 프로도",
          id: 4,
        },
      ]),
    );
  }),
];
