import { rest } from "msw";
import img1 from "../assets/images/여행사진1.jpg";

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
];
