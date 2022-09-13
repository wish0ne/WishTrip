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

  //홈
  rest.post("https://3.36.71.48/msw/home/profile", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token === "null") return res(ctx.status(401)); //비로그인
    return res(
      ctx.json({
        profile: img1,
      }),
    );
  }),
  rest.post("https://3.36.71.48/msw/home/banner", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          image: img8,
          username: "부끄러운 프로도",
          place: "제주 애월읍",
          comment: "로맨틱한",
          profile: img2,
        },
        {
          image: img5,
          username: "부끄러운 프로도",
          place: "제주 애월읍",
          comment: "로맨틱한",
          profile: img2,
        },
        {
          image: img3,
          username: "부끄러운 프로도",
          place: "제주 애월읍",
          comment: "로맨틱한",
          profile: img2,
        },
        {
          image: img7,
          username: "부끄러운 프로도",
          place: "제주 애월읍",
          comment: "로맨틱한",
          profile: img2,
        },
      ]),
    );
  }),
  rest.post("https://3.36.71.48/msw/home/event", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          location: "강남역",
          type: "랜덤박스",
          id: 1,
        },
        {
          location: "선릉역",
          type: "사진촬영",
          id: 2,
        },
        {
          location: "제주도",
          type: "AR포스팅",
          id: 3,
        },
      ]),
    );
  }),
  rest.post("https://3.36.71.48/msw/home/recommend", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          tag: "한적한",
          contents: [
            {
              image: img2,
              title: "사소하지만 아름다운 풍경들",
              location: "프랑스 파리",
              username: "gamsungcross",
              profile: img1,
              id: 1,
            },
            {
              image: img3,
              title: "걷다가 만난 일몰",
              location: "제주 애월읍",
              username: "샛별",
              profile: img5,
              id: 2,
            },
            {
              image: img5,
              title: "한적한 일본 구석구석 여행",
              location: "일본 오사카",
              username: "행복한족제비",
              profile: img7,
              id: 3,
            },
          ],
        },
        {
          id: 2,
          tag: "화려한",
          contents: [
            {
              image: img8,
              title: "양들과 함께 만난 일몰",
              location: "프랑스 파리",
              username: "gamsungcross",
              profile: img1,
              id: 1,
            },
            {
              image: img2,
              title: "걷다가 만난 일몰",
              location: "제주 애월읍",
              username: "샛별",
              profile: img5,
              id: 2,
            },
            {
              image: img7,
              title: "한적한 일본 구석구석 여행",
              location: "일본 오사카",
              username: "행복한족제비",
              profile: img7,
              id: 3,
            },
          ],
        },
      ]),
    );
  }),
];
