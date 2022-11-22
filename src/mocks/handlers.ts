import { rest } from "msw";
import img1 from "../assets/images/여행사진1.jpg";
import img2 from "../assets/images/여행사진2.jpg";
import img3 from "../assets/images/여행사진3.jpg";
import img4 from "../assets/images/여행사진4.jpg";
import img5 from "../assets/images/여행사진5.jpg";
import img6 from "../assets/images/여행사진6.jpg";
import img7 from "../assets/images/여행사진7.jpg";
import img8 from "../assets/images/여행사진8.jpg";
import armock1 from "../assets/images/armock1.png";
import armock2 from "../assets/images/armock2.png";
import armock3 from "../assets/images/armock3.png";
import armock4 from "../assets/images/AR포스트.png";
import { location } from "./location.js";

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
  //로그인/가입
  //1. 로그인 시작화면
  rest.get("https://api.wishtrip.org/msw/auth", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        image: img8,
        icon: img7,
        username: "프로도",
        location: "제주 애월읍",
      }),
    );
  }),
  //2. 회원 확인
  // rest.post<PostValidUserReqBody>(
  //   "https://api.wishtrip.org/msw/isMember",
  //   (req, res, ctx) => {
  //     const { email } = req.body;
  //     if (email === "test@test.com") return res(ctx.status(200)); //회원 o
  //     else return res(ctx.status(401)); //회원 정보 없음
  //   },
  // ),
  //3. 로그인
  // rest.post<PostValidUserReqBody>(
  //   "https://api.wishtrip.org/msw/login",
  //   (req, res, ctx) => {
  //     const { email, password } = req.body;
  //     //이메일, 비밀번호 일치
  //     if (email === "test@test.com" && password === "1234")
  //       return res(
  //         ctx.status(200),
  //         ctx.json({
  //           access_token:
  //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE2NTk3ODU1Mjh9.kYGtPKWIjfxyDF_Ly0bgzIftYYqJS0-0bh44id1r4wM",
  //           token_type: "bearer",
  //         }),
  //       );
  //     //비밀번호 불일치
  //     else return res(ctx.status(401));
  //   },
  // ),
  //4.비밀번호 찾기
  rest.post<PostValidUserReqBody>(
    "https://api.wishtrip.org/msw/recovery",
    (req, res, ctx) => {
      const { email } = req.body;
      //회원정보 존재
      if (email === "hello@gmail.com") return res(ctx.status(200));
      //회원정보 존재하지 않음
      else return res(ctx.status(401));
    },
  ),
  //5. 회원가입
  // rest.post<PostValidUserReqBody>(
  //   "https://api.wishtrip.org/msw/register",
  //   (req, res, ctx) => {
  //     const { email, username } = req.body;
  //     //이메일, 유저네임 중복시 회원가입 불가
  //     if (email === "test" || username === "admin") {
  //       return res(ctx.status(401));
  //     }
  //     //회원가입 성공
  //     else {
  //       return res(ctx.status(200), ctx.json({ msg: "register success" }));
  //     }
  //   },
  // ),

  //마이페이지
  //1. 유저 프로필 조회
  // rest.get("https://api.wishtrip.org/msw/mypage", (req, res, ctx) => {
  //   //유저 토큰 확인
  //   const token = req.headers.get("authorization")?.split(" ")[1];

  //   //유저 토근이 없는 경우 : 로그인하지 않은 경우
  //   if (token === "null") return res(ctx.status(401));

  //   //로그인한 경우
  //   return res(
  //     ctx.json({
  //       icon: null,
  //       username: "부끄러운 프로도",
  //       email: "frodo@gmail.com",
  //     }),
  //   );
  // }),

  //2. 유저 프로필 사진 등록&수정
  // rest.put<{ icon: string }>(
  //   "https://api.wishtrip.org/msw/mypage/edit",
  //   (req, res, ctx) => {
  //     //유저 토큰 확인
  //     const token = req.headers.get("authorization")?.split(" ")[1];

  //     //토큰 인증
  //     if (token === "null") return res(ctx.status(401));

  //     const { icon } = req.body; //새 프로필 이미지
  //     //프로필 수정 실패
  //     if (!icon) return res(ctx.status(400));
  //     //프로필 수정 성공
  //     return res(ctx.status(200));
  //   },
  // ),

  //3. 스크랩 한 글
  // rest.get("https://api.wishtrip.org/msw/mypage/scrap", (req, res, ctx) => {
  //   const token = req.headers.get("authorization")?.split(" ")[1];
  //   //토큰 확인
  //   if (token === "null") return res(ctx.status(401));

  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         image: img4,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 1,
  //       },
  //       {
  //         image: img3,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 2,
  //       },
  //       {
  //         image: img6,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 3,
  //       },
  //       {
  //         image: img5,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 4,
  //       },
  //     ]),
  //   );
  // }),

  //4. 최근 본 글 -> localStorage에 저장
  //localsotrage에 저장한 post_id 배열로 request -> post array 반환
  // rest.get("https://api.wishtrip.org/msw/mypage/recent", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //   const post_id = req.url.searchParams.get("id");
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         image: img4,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 1,
  //       },
  //       {
  //         image: img3,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 2,
  //       },
  //       {
  //         image: img6,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 3,
  //       },
  //       {
  //         image: img5,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 4,
  //       },
  //     ]),
  //   );
  // }),

  // //5. 댓글 단 글
  // rest.get("https://api.wishtrip.org/msw/mypage/comment", (req, res, ctx) => {
  //   const token = req.headers.get("authorization")?.split(" ")[1];
  //   //토큰 확인
  //   if (token === "null") return res(ctx.status(401));

  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         image: img4,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 1,
  //       },
  //       {
  //         image: img3,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 2,
  //       },
  //       {
  //         image: img6,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 3,
  //       },
  //       {
  //         image: img5,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 4,
  //       },
  //     ]),
  //   );
  // }),

  // //6. 업로드 한 글
  // rest.get("https://api.wishtrip.org/msw/mypage/upload", (req, res, ctx) => {
  //   const token = req.headers.get("authorization")?.split(" ")[1];
  //   //토큰 확인
  //   if (token === "null") return res(ctx.status(401));

  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         image: img4,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 1,
  //       },
  //       {
  //         image: img3,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 2,
  //       },
  //       {
  //         image: img6,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 3,
  //       },
  //       {
  //         image: img5,
  //         title: "여행의 제목입니다.",
  //         tags: ["여행", "여행스타그램", "여행에미치다"],
  //         post_id: 4,
  //       },
  //     ]),
  //   );
  // }),

  //홈
  //1. 유저 프로필 받기
  // rest.get("https://api.wishtrip.org/msw/home/profile", (req, res, ctx) => {
  //   //토근 확인
  //   const token = req.headers.get("authorization")?.split(" ")[1];
  //   if (token === "null") return res(ctx.status(401));

  //   //프로필 이미지 전송
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       icon: img1,
  //     }),
  //   );
  // }),

  // //2. 스토리 정보 받기
  // rest.get("https://api.wishtrip.org/msw/home/banner", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         post_id: 1,
  //         image: img8,
  //         username: "부끄러운 프로도",
  //         location: "제주 애월읍",
  //         tag: "로맨틱한",
  //         icon: img2,
  //       },
  //       {
  //         post_id: 2,
  //         image: img1,
  //         username: "부끄러운 프로도",
  //         location: "제주 애월읍",
  //         tag: "로맨틱한",
  //         icon: img2,
  //       },
  //       {
  //         post_id: 3,
  //         image: img5,
  //         username: "부끄러운 프로도",
  //         location: "제주 애월읍",
  //         tag: "로맨틱한",
  //         icon: img2,
  //       },
  //       {
  //         post_id: 4,
  //         image: img7,
  //         username: "부끄러운 프로도",
  //         location: "제주 애월읍",
  //         tag: "로맨틱한",
  //         icon: img2,
  //       },
  //     ]),
  //   );
  // }),

  // //3. 이벤트 정보 받기
  // rest.get("https://api.wishtrip.org/msw/home/event", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         location: "강남역",
  //         type: "랜덤박스",
  //         id: 1,
  //       },
  //       {
  //         location: "선릉역",
  //         type: "사진촬영",
  //         id: 2,
  //       },
  //       {
  //         location: "제주도",
  //         type: "AR포스팅",
  //         id: 3,
  //       },
  //     ]),
  //   );
  // }),

  // //4. 추천 포스트
  // rest.get("https://api.wishtrip.org/msw/home/recommend", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         id: 12,
  //         tag: "한적한",
  //         posts: [
  //           {
  //             image: img2,
  //             title: "사소하지만 아름다운 풍경들",
  //             location: "프랑스 파리",
  //             username: "gamsungcross",
  //             icon: img1,
  //             post_id: 1,
  //           },
  //           {
  //             image: img3,
  //             title: "걷다가 만난 일몰",
  //             location: "제주 애월읍",
  //             username: "샛별",
  //             icon: img5,
  //             post_id: 2,
  //           },
  //           {
  //             image: img5,
  //             title: "한적한 일본 구석구석 여행",
  //             location: "일본 오사카",
  //             username: "행복한족제비",
  //             icon: img7,
  //             post_id: 3,
  //           },
  //         ],
  //       },
  //       {
  //         id: 10,
  //         tag: "화려한",
  //         posts: [
  //           {
  //             image: img8,
  //             title: "양들과 함께 만난 일몰",
  //             location: "프랑스 파리",
  //             username: "gamsungcross",
  //             icon: img1,
  //             post_id: 4,
  //           },
  //           {
  //             image: img2,
  //             title: "걷다가 만난 일몰",
  //             location: "제주 애월읍",
  //             username: "샛별",
  //             icon: img5,
  //             post_id: 5,
  //           },
  //           {
  //             image: img7,
  //             title: "한적한 일본 구석구석 여행",
  //             location: "일본 오사카",
  //             username: "행복한족제비",
  //             icon: img7,
  //             post_id: 6,
  //           },
  //         ],
  //       },
  //     ]),
  //   );
  // }),

  //포스트 작성
  //1. 포스트 작성
  // rest.post<{
  //   file: File; //AR 이미지
  //   image: File; //이미지 원본
  //   title: string; //제목
  //   body: string; //내용
  //   location: string; //장소
  //   tags: string[]; //태그
  //   x: number; //위도
  //   y: number; //경도
  //   z: number; //고도
  //   date: Date; //작성 날짜
  // }>("https://api.wishtrip.org/msw/arpost/create", (req, res, ctx) => {
  //   //토근 확인
  //   const token = req.headers.get("authorization")?.split(" ")[1];
  //   if (token === "null") return res(ctx.status(401));

  //   const { file, image, title, body, location, tags, x, y, z, date } =
  //     req.body;
  //   //데이터 확인
  //   if (file && image && title && body && tags && x && y && z && date) {
  //     return res(ctx.status(200), ctx.json({ msg: "ARpost create success" }));
  //   } else return res(ctx.status(400), ctx.json({ msg: "ARpost create fail" }));
  // }),

  // //2. 태그 자동완성
  // rest.get("https://api.wishtrip.org/msw/hashtag", (req, res, ctx) => {
  //   //토근 확인
  //   const token = req.headers.get("authorization")?.split(" ")[1];
  //   if (token === "null") return res(ctx.status(401));

  //   const tag = req.url.searchParams.get("tag");
  //   //일치 태그 존재
  //   if (tag === "여")
  //     return res(
  //       ctx.status(200),
  //       ctx.json(["여행", "여수", "여치", "여수밤바다"]),
  //     );
  //   if (tag === "부")
  //     return res(
  //       ctx.status(200),
  //       ctx.json(["부산", "부산앞바다", "부리부리", "부산에서제일맛있는집"]),
  //     );

  //   //일치하는 태그 없음
  //   return res(ctx.status(200), ctx.json([]));
  // }),

  //주변 AR 포스트 읽기
  //1. 주변 AR 포스트 읽기 -> 유저 좌표를 계산해서 변환한 대표좌표로 요청
  // rest.get<{ x: number; y: number; z: number }>(
  //   "https://api.wishtrip.org/msw/arpost/get_around_posts",
  //   (req, res, ctx) => {
  //     //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //     //유저 좌표 1km 이내 AR post 반환
  //     //res : {AR포스트 id, AR 이미지, AR포스트 좌표(x, y, z)}
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           ar_post_id: 1,
  //           image: armock1,
  //           x_value: location[0].x_value,
  //           y_value: location[0].y_value,
  //           z_value: 0,
  //         },
  //         {
  //           ar_post_id: 2,
  //           image: armock2,
  //           x_value: location[1].x_value,
  //           y_value: location[1].y_value,
  //           z_value: 1,
  //         },
  //         {
  //           ar_post_id: 3,
  //           image: armock3,
  //           x_value: location[2].x_value,
  //           y_value: location[2].y_value,
  //           z_value: 1,
  //         },
  //         {
  //           ar_post_id: 4,
  //           image: armock4,
  //           x_value: location[3].x_value,
  //           y_value: location[3].y_value,
  //           z_value: 0,
  //         },
  //         {
  //           ar_post_id: 5,
  //           image: armock4,
  //           x_value: location[4].x_value,
  //           y_value: location[4].y_value,
  //           z_value: 0,
  //         },
  //         {
  //           ar_post_id: 6,
  //           image: armock4,
  //           x_value: location[5].x_value,
  //           y_value: location[5].y_value,
  //           z_value: 0,
  //         },
  //         {
  //           ar_post_id: 7,
  //           image: armock4,
  //           x_value: location[6].x_value,
  //           y_value: location[6].y_value,
  //           z_value: 0,
  //         },
  //       ]),
  //     );
  //   },
  // ),

  //포스트 검색
  // //1. 지금 인기 태그
  // rest.get("https://api.wishtrip.org/msw/get_popular_tags", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //   //인기 태그 반환
  //   //res : {id, 태그, 해당게시물 개수, posts:[{id, 원본이미지, 제목, 유저네임}]}

  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         id: 1,
  //         tag: "피자",
  //         count: 312,
  //         posts: [
  //           {
  //             post_id: 1,
  //             image: img2,
  //             title: "사소하지만 아름다운 풍경들",
  //             username: "샛별",
  //           },
  //           {
  //             post_id: 2,
  //             image: img3,
  //             title: "사소하지만 아름다운 풍경들",
  //             username: "샛별",
  //           },
  //           {
  //             post_id: 3,
  //             image: img4,
  //             title: "사소하지만 아름다운 풍경들",
  //             username: "샛별",
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         tag: "피자맛집",
  //         count: 20,
  //         posts: [
  //           {
  //             post_id: 1,
  //             image: img2,
  //             title: "사소하지만 아름다운 풍경들",
  //             username: "샛별",
  //           },
  //           {
  //             post_id: 2,
  //             image: img3,
  //             title: "사소하지만 아름다운 풍경들",
  //             username: "샛별",
  //           },
  //           {
  //             post_id: 3,
  //             image: img4,
  //             title: "사소하지만 아름다운 풍경들",
  //             username: "샛별",
  //           },
  //         ],
  //       },
  //     ]),
  //   );
  // }),

  // //2. 포스트로 검색 (제목일치로 판단)
  // rest.get("https://api.wishtrip.org/msw/search_post", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //   //res : [{id, 태그, 원본이미지, 제목}]
  //   const title = req.url.searchParams.get("title");
  //   if (title === "부산")
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           post_id: 1,
  //           tag: ["햄버거", "치킨"],
  //           image: img2,
  //           title: "여행의 제목입니다",
  //         },
  //         {
  //           post_id: 2,
  //           tag: ["부산", "부산맛집"],
  //           image: img7,
  //           title: "부산여행",
  //         },
  //         {
  //           post_id: 3,
  //           tag: ["햄버거", "치킨"],
  //           image: img8,
  //           title: "여행의 제목입니다",
  //         },
  //       ]),
  //     );

  //   //검색결과 없으면 빈 배열 반환
  //   return res(ctx.status(200), ctx.json([]));
  // }),

  // //3. 태그로 검색
  // rest.get("https://api.wishtrip.org/msw/search_tag", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //   //검색 태그가 일치하는 포스트 반환
  //   //res : {id, 태그, 해당게시물 개수, posts:[{id, 원본이미지, 제목, 유저네임}]}
  //   const tag = req.url.searchParams.get("tag");
  //   if (tag === "피자")
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           id: 1,
  //           tag: "여행",
  //           count: 312,
  //           posts: [
  //             {
  //               post_id: 1,
  //               image: img2,
  //               title: "사소하지만 아름다운 풍경들",
  //               username: "샛별",
  //             },
  //             {
  //               post_id: 2,
  //               image: img3,
  //               title: "사소하지만 아름다운 풍경들",
  //               username: "샛별",
  //             },
  //             {
  //               post_id: 3,
  //               image: img4,
  //               title: "사소하지만 아름다운 풍경들",
  //               username: "샛별",
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           tag: "바다",
  //           count: 20,
  //           posts: [
  //             {
  //               post_id: 1,
  //               image: img2,
  //               title: "사소하지만 아름다운 풍경들",
  //               username: "샛별",
  //             },
  //             {
  //               post_id: 2,
  //               image: img3,
  //               title: "사소하지만 아름다운 풍경들",
  //               username: "샛별",
  //             },
  //             {
  //               post_id: 3,
  //               image: img4,
  //               title: "사소하지만 아름다운 풍경들",
  //               username: "샛별",
  //             },
  //           ],
  //         },
  //       ]),
  //     );

  //   //검색결과 없으면 빈 배열 반환
  //   return res(ctx.status(200), ctx.json([]));
  // }),

  // //4. 장소로 검색
  // rest.get("https://api.wishtrip.org/msw/search_location", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //   //장소가 일치하는 포스트 반환
  //   //res : [{id, 장소, 일치포스트 개수}]
  //   const location = req.url.searchParams.get("location");
  //   if (location === "해운대")
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           post_id: 1,
  //           tag: ["햄버거", "치킨"],
  //           image: img2,
  //           title: "여행의 제목입니다",
  //         },
  //         {
  //           post_id: 2,
  //           tag: ["부산", "부산맛집"],
  //           image: img7,
  //           title: "부산여행",
  //         },
  //         {
  //           post_id: 3,
  //           tag: ["햄버거", "치킨"],
  //           image: img8,
  //           title: "여행의 제목입니다",
  //         },
  //       ]),
  //     );

  //   //검색결과 없으면 빈 배열 반환
  //   return res(ctx.status(200), ctx.json([]));
  // }),

  // //5. 유저로 검색
  // rest.get("https://api.wishtrip.org/msw/search_username", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

  //   //검색 쿼리가 포함된 유저네임들 반환
  //   //res : [{id, 유저네임, 유저가 작성한 게시물 수, 유저아이콘}]
  //   const username = req.url.searchParams.get("username");
  //   if (username === "프로도")
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           id: 1,
  //           username: "부끄러운프로도",
  //           count: 312,
  //           icon: img1,
  //         },
  //         {
  //           id: 2,
  //           username: "frodo",
  //           count: 312,
  //           icon: img5,
  //         },
  //         {
  //           id: 3,
  //           username: "프로도",
  //           count: 20,
  //           icon: img6,
  //         },
  //       ]),
  //     );

  //   //검색결과 없으면 빈 배열 반환
  //   return res(ctx.status(200), ctx.json([]));
  // }),

  //다른 유저 프로필 조회
  //1. 유저 정보 받기 -> username 일치하는 유저 정보 반환 (유저네임 중복 불가)
  // rest.get("https://api.wishtrip.org/msw/get_user_profile", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
  //   const username = req.url.searchParams.get("username");
  //   //username으로 유저 조회해서 결과 반환
  //   //res : {유저네임, 유저 아이콘}
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: username,
  //       icon: img2,
  //     }),
  //   );
  // }),

  // //2. 유저가 업로드한 글 받기 -> username 일치하는 유저가 업로드한 글 반환
  // rest.get("https://api.wishtrip.org/msw/get_user_posts", (req, res, ctx) => {
  //   //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
  //   const username = req.url.searchParams.get("username");
  //   //username으로 유저 조회해서 결과 반환
  //   //res : [{포스트id, 원본이미지, 제목, 태그배열}]
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         post_id: 1,
  //         image: img2,
  //         title: "여행제목",
  //         tags: ["여행", "부산", "해운대"],
  //       },
  //       {
  //         post_id: 2,
  //         image: img3,
  //         title: "제목",
  //         tags: ["여수", "여행"],
  //       },
  //     ]),
  //   );
  // }),

  // //3. 유저가 댓글 단 글 받기 -> username 일치하는 유저가 댓글 단 글 반환
  // rest.get(
  //   "https://api.wishtrip.org/msw/get_user_comments",
  //   (req, res, ctx) => {
  //     //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
  //     const username = req.url.searchParams.get("username");
  //     //username으로 유저 조회해서 결과 반환
  //     //res : [{포스트id, 원본이미지, 제목, 태그배열}]
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           post_id: 1,
  //           image: img3,
  //           title: "여행제목",
  //           tags: ["여행", "부산", "해운대"],
  //         },
  //         {
  //           post_id: 2,
  //           image: img7,
  //           title: "제목",
  //           tags: ["여수", "여행"],
  //         },
  //       ]),
  //     );
  //   },
  // ),

  //포스트 읽기
  //본인이 작성한 포스트인지 아닌지 구분 필요 -> 토큰 없으면 무조건 작성자 아님, 토큰 있으면 토큰으로 작성자인지 판단해서 isWriter 반환
  //1. 포스트 정보 받기 -> id 일치하는 포스트 정보 반환
  rest.get("https://api.wishtrip.org/msw/post/read", (req, res, ctx) => {
    //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
    const post_id = req.url.searchParams.get("id");
    //res : {포스트 id, 작성자 유저네임, 작성날짜, 작성자 아이콘, 원본이미지, 감정:{crying:0, shock:0, laugh:20, thumb:1, heart:5}], 제목, 내용, 태그배열, 장소, 댓글배열, 작성자여부, 스크랩 여부(false, true), 등록한 이모지(설정하지 않았으면 null)}
    return res(
      ctx.status(200),
      ctx.json({
        post_id: 1,
        username: "부끄러운 프로도",
        date: "2021-08-01",
        icon: img2,
        image: img2,
        emotion: { crying: 0, shock: 0, laugh: 20, thumb: 1, heart: 5 },
        title: "진짜 휴가는 지금부터~! 신나는 페스티벌이 기다리고 있어요",
        body: "아직 휴가 못 가신 분~~! 진짜 휴가는 지금부터~! 신나는 페스티벌이 기다리고 있어요 🎷\n라인업만 봐도 심장이 두근대는데요..\n\n마지막 여름 휴가 계획 중이시던 분들, 이번 기회에 전주 여행도 함께 묶어서 JUMF 즐기고 오는 건 어떠신지요!\n티켓 무료 증정 이벤트도 진행 중이라니까 참여해보세요!\n\n❗️이벤트는 이 게시글이 아닌 JUMF 계정 @2022_jumf 팔로워 이벤트 게시물에서 참여하셔야 정상 접수 됩니다! (해당 계정에 이벤트 참여 게시글 고정되어 있어요)",
        tags: ["여행", "부산", "해운대"],
        location: "부산",
        isWriter: false,
        isScrap: false, //true/false
        myEmotion: "laugh", //crying/shock/laugh/thumb/heart/null(없으면)
      }),
    );
  }),

  //1-2. 포스트 댓글 정보 받기
  rest.get(
    "https://api.wishtrip.org/msw/post/read/comments",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
      const post_id = req.url.searchParams.get("id");
      //res : {포스트 id, 작성자 유저네임, 작성날짜, 작성자 아이콘, 원본이미지, 감정:{crying:0, shock:0, laugh:20, thumb:1, heart:5}], 제목, 내용, 태그배열, 장소, 댓글배열, 작성자여부, 스크랩 여부(false, true), 등록한 이모지(설정하지 않았으면 null)}
      return res(
        ctx.status(200),
        ctx.json([
          {
            comment_id: 1,
            icon: img2,
            username: "부끄러운 프로도",
            body: "댓글입니다.",
            date: "2021-08-01",
          },
          {
            comment_id: 2,
            icon: img6,
            username: "어피치",
            body: "댓글입니다.",
            date: "2022-05-01",
          },
        ]),
      );
    },
  ),

  //2. 스크랩 등록/해제
  //parameter : 포스트 id, 스크랩 여부
  rest.put<{ post_id: number; isScrap: boolean }>(
    "https://api.wishtrip.org/msw/post/scrap",
    (req, res, ctx) => {
      //토근 확인
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (token === "null") return res(ctx.status(401));

      const { isScrap } = req.body;
      //스크랩 등록/해제 성공
      if (isScrap === true || isScrap === false) return res(ctx.status(200));

      //실패
      return res(ctx.status(400));
    },
  ),

  //3. 감정 등록/해제
  //parameter : 포스트 id, 감정(crying/shock/laugh/thumb/heart/null)
  rest.put<{ post_id: number; myEmotion: string | null }>(
    "https://api.wishtrip.org/msw/post/emotion",
    (req, res, ctx) => {
      //토근 확인
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (token === "null") return res(ctx.status(401));

      const { myEmotion } = req.body;
      //감정 삭제 성공
      if (myEmotion === null) return res(ctx.status(200));
      //감정 등록 성공
      if (["crying", "shock", "laugh", "thumb", "heart"].includes(myEmotion))
        return res(ctx.status(200));

      //실패
      return res(ctx.status(400));
    },
  ),

  //4. 댓글 등록
  //parameter : 포스트 id, 댓글 내용, 댓글 작성일
  rest.post<{ post_id: number; comment: string; date: Date }>(
    "https://api.wishtrip.org/msw/post/comment/add",
    (req, res, ctx) => {
      //토근 확인
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (token === "null") return res(ctx.status(401));

      const { comment } = req.body;
      //댓글 등록 성공
      if (comment !== "") return res(ctx.status(200));

      //실패
      return res(ctx.status(400));
    },
  ),

  //5. 댓글 삭제
  //parameter : 포스트 id, 댓글 id
  rest.delete<{ post_id: number; comment_id: number }>(
    "https://api.wishtrip.org/msw/post/comment/delete",
    (req, res, ctx) => {
      //토근 확인
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (token === "null") return res(ctx.status(401));

      const { post_id, comment_id } = req.body;
      //댓글 삭제 성공
      if (post_id && comment_id) return res(ctx.status(200));

      //실패
      return res(ctx.status(400));
    },
  ),

  //6. 포스트 삭제
  rest.delete<{ post_id: number }>(
    "https://api.wishtrip.org/msw/post/delete",
    (req, res, ctx) => {
      //토근 확인 (본인이 작성한 글일때만 삭제 가능)
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (token === "null") return res(ctx.status(401));

      const { post_id } = req.body;
      //포스트 삭제 성공
      if (post_id) return res(ctx.status(200));

      //실패
      return res(ctx.status(400));
    },
  ),
];
