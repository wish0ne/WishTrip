import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ExtraBold from "../assets/fonts/AppleSDGothicNeoEB.ttf";
import Medium from "../assets/fonts/AppleSDGothicNeoM.ttf";
import SemiBold from "../assets/fonts/AppleSDGothicNeoB.ttf";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
    height: 100%;
    min-height: calc(100% + env(safe-area-inset-top));
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
  
  body {
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  
  body::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  
  #root {
    height: 100%;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  
  /* mobile first */
  /* @media screen and (max-width: 767px) {
    html {
    }
  }
  
  /* 태블릿 */
  @media screen and (max-width: 1023px) and (min-width: 768px) {
    html {
      font-size: 50%;
    }
  }
  
  /* 데스크탑 */
  @media screen and (min-width: 1024px) {
    html {
      font-size: 60%;
    }
    body {
      width: 1024px;
      margin: 0 auto;
    }
  }
  
  /* font */
  @font-face {
    font-family: "ExtraBold";
    src:url(${ExtraBold}) format('truetype');
  }

  @font-face {
    font-family: "Medium";
    src:url(${Medium}) format('truetype');
  }
  @font-face {
    font-family: "SemiBold";
    src:url(${SemiBold}) format('truetype');
  }

  
`;
