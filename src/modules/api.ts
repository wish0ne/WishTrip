import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.wishtrip.org/",
  timeout: 1000,
});

//request interceptor
instance.interceptors.request.use(
  (config) => {
    //요청 성공 직전 호출
    //axios 설정값 추가
    if (config.headers)
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken",
      )}`;
    return config;
  },
  (error) => {
    //요청 에러 직전 호출
    throw error;
  },
);

//response interceptor
instance.interceptors.response.use(
  (response) => {
    //응답 성공 직전 호출
    //.then()으로 이어짐
    console.log(response);
    return response;
  },
  (error) => {
    //응답 에러 직전 호출
    //.catch()로 이어짐
    throw error;
  },
);

export default instance;
