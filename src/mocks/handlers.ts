import { rest } from "msw";

interface PostValidUserReqBody {
  email: string;
}

export const handlers = [
  //method, path, function
  //req : information about the captured request
  //res : function to create the mocked response
  //ctx : context utilities specific to the current request handler
  rest.post<PostValidUserReqBody>(
    "http://3.36.71.48/msw/login",
    (req, res, ctx) => {
      const { email } = req.body;
      if (email === "test") return res(ctx.status(200));
      else return res(ctx.status(400));
    },
  ),
];
