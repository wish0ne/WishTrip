import { rest } from "msw";

interface PostValidUserReqBody {
  email: string;
  password?: string;
}

//method, path, function
//req : information about the captured request
//res : function to create the mocked response
//ctx : context utilities specific to the current request handler
export const handlers = [
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
];
