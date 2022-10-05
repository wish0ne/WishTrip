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
  rest.get("http://3.36.71.48/msw/auth", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        image: img8,
        icon: img3,
        username: "프로도",
        location: "제주 애월읍",
      }),
    );
  }),
  //2. 회원 확인
  rest.post<PostValidUserReqBody>(
    "http://3.36.71.48/msw/isMember",
    (req, res, ctx) => {
      const { email } = req.body;
      if (email === "hello@gmail.com") return res(ctx.status(200)); //회원 o
      else return res(ctx.status(401)); //회원 정보 없음
    },
  ),
  //3. 로그인
  rest.post<PostValidUserReqBody>(
    "http://3.36.71.48/msw/login",
    (req, res, ctx) => {
      const { email, password } = req.body;
      //이메일, 비밀번호 일치
      if (email === "hello@gmail.com" && password === "1234")
        return res(
          ctx.status(200),
          ctx.json({
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE2NTk3ODU1Mjh9.kYGtPKWIjfxyDF_Ly0bgzIftYYqJS0-0bh44id1r4wM",
            token_type: "bearer",
          }),
        );
      //비밀번호 불일치
      else return res(ctx.status(401));
    },
  ),
  //4.비밀번호 찾기
  rest.post<PostValidUserReqBody>(
    "http://3.36.71.48/msw/recovery",
    (req, res, ctx) => {
      const { email } = req.body;
      //회원정보 존재
      if (email === "hello@gmail.com") return res(ctx.status(200));
      //회원정보 존재하지 않음
      else return res(ctx.status(401));
    },
  ),
  //5. 회원가입
  rest.post<PostValidUserReqBody>(
    "http://3.36.71.48/msw/register",
    (req, res, ctx) => {
      const { email, username } = req.body;
      //이메일, 유저네임 중복시 회원가입 불가
      if (email === "test" || username === "admin") {
        return res(ctx.status(401));
      }
      //회원가입 성공
      else {
        return res(ctx.status(200), ctx.json({ msg: "register success" }));
      }
    },
  ),

  //마이페이지
  //1. 유저 프로필 조회
  rest.get("http://3.36.71.48/msw/mypage", (req, res, ctx) => {
    //유저 토큰 확인
    const token = req.headers.get("authorization")?.split(" ")[1];

    //유저 토근이 없는 경우 : 로그인하지 않은 경우
    if (token === "null") return res(ctx.status(401));

    //로그인한 경우
    return res(
      ctx.json({
        icon: img1,
        username: "부끄러운 프로도",
        email: "frodo@gmail.com",
      }),
    );
  }),

  //2. 유저 프로필 사진 등록&수정
  rest.put<{ icon: string }>(
    "http://3.36.71.48/msw/mypage/edit",
    (req, res, ctx) => {
      //유저 토큰 확인
      const token = req.headers.get("authorization")?.split(" ")[1];

      //토큰 인증
      if (token === "null") return res(ctx.status(401));

      const { icon } = req.body; //새 프로필 이미지
      //프로필 수정 실패
      if (!icon) return res(ctx.status(400));
      //프로필 수정 성공
      return res(ctx.status(200));
    },
  ),

  //3. 스크랩 한 글
  rest.get("http://3.36.71.48/msw/mypage/scrap", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    //토큰 확인
    if (token === "null") return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json([
        {
          image: img4,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 1,
        },
        {
          image: img3,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 2,
        },
        {
          image: img6,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 3,
        },
        {
          image: img5,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 4,
        },
      ]),
    );
  }),

  //4. 최근 본 글 -> localStorage에 저장

  //5. 댓글 단 글
  rest.get("http://3.36.71.48/msw/mypage/comment", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    //토큰 확인
    if (token === "null") return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json([
        {
          image: img4,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 1,
        },
        {
          image: img3,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 2,
        },
        {
          image: img6,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 3,
        },
        {
          image: img5,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 4,
        },
      ]),
    );
  }),

  //6. 업로드 한 글
  rest.get("http://3.36.71.48/msw/mypage/upload", (req, res, ctx) => {
    const token = req.headers.get("authorization")?.split(" ")[1];
    //토큰 확인
    if (token === "null") return res(ctx.status(401));

    return res(
      ctx.status(200),
      ctx.json([
        {
          image: img4,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 1,
        },
        {
          image: img3,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 2,
        },
        {
          image: img6,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 3,
        },
        {
          image: img5,
          title: "여행의 제목입니다.",
          tags: ["#여행", "#여행스타그램", "#여행에미치다"],
          id: 4,
        },
      ]),
    );
  }),

  //홈
  //1. 유저 프로필 받기
  rest.get("http://3.36.71.48/msw/home/profile", (req, res, ctx) => {
    //토근 확인
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token === "null") return res(ctx.status(401));

    //프로필 이미지 전송
    return res(
      ctx.status(200),
      ctx.json({
        icon: img1,
      }),
    );
  }),

  //2. 스토리 정보 받기
  rest.get("http://3.36.71.48/msw/home/banner", (req, res, ctx) => {
    //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          image: img8,
          username: "부끄러운 프로도",
          location: "제주 애월읍",
          tag: "로맨틱한",
          icon: img2,
        },
        {
          id: 2,
          image: img1,
          username: "부끄러운 프로도",
          location: "제주 애월읍",
          tag: "로맨틱한",
          icon: img2,
        },
        {
          id: 3,
          image: img5,
          username: "부끄러운 프로도",
          location: "제주 애월읍",
          tag: "로맨틱한",
          icon: img2,
        },
        {
          id: 4,
          image: img7,
          username: "부끄러운 프로도",
          location: "제주 애월읍",
          tag: "로맨틱한",
          icon: img2,
        },
      ]),
    );
  }),

  //3. 이벤트 정보 받기
  rest.get("http://3.36.71.48/msw/home/event", (req, res, ctx) => {
    //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
    return res(
      ctx.status(200),
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

  //4. 추천 포스트
  rest.get("http://3.36.71.48/msw/home/recommend", (req, res, ctx) => {
    //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          tag: "한적한",
          posts: [
            {
              image: img2,
              title: "사소하지만 아름다운 풍경들",
              location: "프랑스 파리",
              username: "gamsungcross",
              icon: img1,
              id: 1,
            },
            {
              image: img3,
              title: "걷다가 만난 일몰",
              location: "제주 애월읍",
              username: "샛별",
              icon: img5,
              id: 2,
            },
            {
              image: img5,
              title: "한적한 일본 구석구석 여행",
              location: "일본 오사카",
              username: "행복한족제비",
              icon: img7,
              id: 3,
            },
          ],
        },
        {
          id: 2,
          tag: "화려한",
          posts: [
            {
              image: img8,
              title: "양들과 함께 만난 일몰",
              location: "프랑스 파리",
              username: "gamsungcross",
              icon: img1,
              id: 1,
            },
            {
              image: img2,
              title: "걷다가 만난 일몰",
              location: "제주 애월읍",
              username: "샛별",
              icon: img5,
              id: 2,
            },
            {
              image: img7,
              title: "한적한 일본 구석구석 여행",
              location: "일본 오사카",
              username: "행복한족제비",
              icon: img7,
              id: 3,
            },
          ],
        },
      ]),
    );
  }),

  //포스트 작성
  //1. 포스트 작성
  rest.post<{
    file: File; //AR 이미지
    image: File; //이미지 원본
    title: string; //제목
    body: string; //내용
    location: string; //장소
    tag: string[]; //태그
    x: number; //위도
    y: number; //경도
    z: number; //고도
    date: Date; //작성 날짜
  }>("http://3.36.71.48/msw/arpost/create", (req, res, ctx) => {
    //토근 확인
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (token === "null") return res(ctx.status(401));

    return res(ctx.status(200), ctx.json({ msg: "ARpost create success" }));
  }),

  //2. 태그 자동완성
  rest.get<{ tag: string }>(
    "http://3.36.71.48/msw/hashtag",
    (req, res, ctx) => {
      //토근 확인
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (token === "null") return res(ctx.status(401));

      const { tag } = req.body;
      //일치 태그 존재
      if (tag === "여")
        return res(
          ctx.status(200),
          ctx.json({ fit: ["여행", "여수", "여치", "여수밤바다"] }),
        );
      if (tag === "부")
        return res(
          ctx.status(200),
          ctx.json({
            fit: ["부산", "부산앞바다", "부리부리", "부산에서제일맛있는집"],
          }),
        );

      //일치하는 태그 없음
      return res(ctx.status(200), ctx.json([]));
    },
  ),

  //주변 AR 포스트 읽기
  //1. 주변 AR 포스트 읽기 -> 유저 좌표를 계산해서 변환한 대표좌표로 요청
  rest.get<{ x: number; y: number; z: number }>(
    "http://3.36.71.48/msw/arpost/get_around_posts",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //유저 좌표 1km 이내 AR post 반환
      //res : {AR포스트 id, AR 이미지, AR포스트 좌표(x, y, z)}
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            image: armock1,
            x_value: 37.243707,
            y_value: 127.077247,
            z_value: 0,
          },
          {
            id: 2,
            image: armock2,
            x_value: 37.243021,
            y_value: 127.076998,
            z_value: 1,
          },
          {
            id: 3,
            image: armock3,
            x_value: 37.244807,
            y_value: 127.077034,
            z_value: 1,
          },
          {
            id: 4,
            image: armock4,
            x_value: 37.244108,
            y_value: 127.079135,
            z_value: 0,
          },
        ]),
      );
    },
  ),

  //포스트 검색
  //1. 지금 인기 태그
  rest.get("http://3.36.71.48/msw/get_popular_tags", (req, res, ctx) => {
    //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

    //인기 태그 반환
    //res : {id, 태그, 해당게시물 개수, posts:[{id, 원본이미지, 제목, 유저네임}]}
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          tag: "여행",
          count: 312,
          posts: [
            {
              id: 1,
              image: img2,
              title: "사소하지만 아름다운 풍경들",
              username: "샛별",
            },
            {
              id: 2,
              image: img3,
              title: "사소하지만 아름다운 풍경들",
              username: "샛별",
            },
            {
              id: 3,
              image: img4,
              title: "사소하지만 아름다운 풍경들",
              username: "샛별",
            },
          ],
        },
        {
          id: 2,
          tag: "바다",
          count: 20,
          posts: [
            {
              id: 1,
              image: img2,
              title: "사소하지만 아름다운 풍경들",
              username: "샛별",
            },
            {
              id: 2,
              image: img3,
              title: "사소하지만 아름다운 풍경들",
              username: "샛별",
            },
            {
              id: 3,
              image: img4,
              title: "사소하지만 아름다운 풍경들",
              username: "샛별",
            },
          ],
        },
      ]),
    );
  }),

  //2. 포스트로 검색 (제목일치로 판단)
  rest.get<{ title: string }>(
    "http://3.36.71.48/msw/search_post",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //인기 태그 반환
      //res : [{id, 태그, 원본이미지, 제목}]
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            tag: ["햄버거", "치킨"],
            image: img2,
            title: "여행의 제목입니다",
          },
          {
            id: 2,
            tag: ["부산", "부산맛집"],
            image: img7,
            title: "부산여행",
          },
          {
            id: 3,
            tag: ["햄버거", "치킨"],
            image: img8,
            title: "여행의 제목입니다",
          },
        ]),
      );
    },
  ),

  //3. 태그로 검색
  rest.get<{ tag: string }>(
    "http://3.36.71.48/msw/search_tag",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //검색 태그가 일치하는 포스트 반환
      //res : {id, 태그, 해당게시물 개수, posts:[{id, 원본이미지, 제목, 유저네임}]}
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            tag: "여행",
            count: 312,
            posts: [
              {
                id: 1,
                image: img2,
                title: "사소하지만 아름다운 풍경들",
                username: "샛별",
              },
              {
                id: 2,
                image: img3,
                title: "사소하지만 아름다운 풍경들",
                username: "샛별",
              },
              {
                id: 3,
                image: img4,
                title: "사소하지만 아름다운 풍경들",
                username: "샛별",
              },
            ],
          },
          {
            id: 2,
            tag: "바다",
            count: 20,
            posts: [
              {
                id: 1,
                image: img2,
                title: "사소하지만 아름다운 풍경들",
                username: "샛별",
              },
              {
                id: 2,
                image: img3,
                title: "사소하지만 아름다운 풍경들",
                username: "샛별",
              },
              {
                id: 3,
                image: img4,
                title: "사소하지만 아름다운 풍경들",
                username: "샛별",
              },
            ],
          },
        ]),
      );
    },
  ),

  //4. 장소로 검색
  rest.get<{ location: string }>(
    "http://3.36.71.48/msw/search_location",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //장소가 일치하는 포스트 반환
      //res : [{id, 장소, 일치포스트 개수}]
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            location: "부산",
            count: 312,
          },
          {
            id: 2,
            location: "부산해운대",
            count: 20,
          },
        ]),
      );
    },
  ),

  //5. 유저로 검색
  rest.get<{ username: string }>(
    "http://3.36.71.48/msw/search_username",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //검색 쿼리가 포함된 유저네임들 반환
      //res : [{id, 유저네임, 유저가 작성한 게시물 수, 유저아이콘ㄹ}]
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            username: "부끄러운 프로도",
            count: 312,
            icon: img1,
          },
          {
            id: 2,
            username: "어피치",
            count: 312,
            icon: img5,
          },
          {
            id: 3,
            username: "프로도",
            count: 20,
            icon: img6,
          },
        ]),
      );
    },
  ),

  //다른 유저 프로필 조회
  //1. 유저 정보 받기 -> username 일치하는 유저 정보 반환 (유저네임 중복 불가)
  rest.get<{ username: string }>(
    "http://3.36.71.48/msw/get_user_profile",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //username으로 유저 조회해서 결과 반환
      //res : {유저네임, 유저 아이콘}
      return res(
        ctx.status(200),
        ctx.json({
          username: "부끄러운 프로도",
          icon: img2,
        }),
      );
    },
  ),

  //2. 유저가 업로드한 글 받기 -> username 일치하는 유저가 업로드한 글 반환
  rest.get<{ username: string }>(
    "http://3.36.71.48/msw/get_user_posts",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //username으로 유저 조회해서 결과 반환
      //res : [{포스트id, 원본이미지, 제목, 태그배열}]
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            image: img2,
            title: "여행제목",
            tags: ["여행", "부산", "해운대"],
          },
          {
            id: 2,
            image: img3,
            title: "제목",
            tags: ["여수", "여행"],
          },
        ]),
      );
    },
  ),

  //3. 유저가 댓글 단 글 받기 -> username 일치하는 유저가 댓글 단 글 반환
  rest.get<{ username: string }>(
    "http://3.36.71.48/msw/get_user_comments",
    (req, res, ctx) => {
      //토큰 검사 x (로그인 안해도 보여줘야 하기 때문)

      //username으로 유저 조회해서 결과 반환
      //res : [{포스트id, 원본이미지, 제목, 태그배열}]
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            image: img2,
            title: "여행제목",
            tags: ["여행", "부산", "해운대"],
          },
          {
            id: 2,
            image: img3,
            title: "제목",
            tags: ["여수", "여행"],
          },
        ]),
      );
    },
  ),
];
