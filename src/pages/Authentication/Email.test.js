import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Email from "./Email";
import { RecoilRoot } from "recoil";
import { createMemoryHistory } from "@remix-run/router";
import userEvent from "@testing-library/user-event";

describe("<Email />", () => {
  const history = createMemoryHistory();
  const setup = (props = {}) => {
    render(
      <RecoilRoot>
        <BrowserRouter location={history}>
          <ThemeProvider theme={theme}>
            <Email />
          </ThemeProvider>
        </BrowserRouter>
      </RecoilRoot>,
    );
    const input = screen.getByLabelText("이메일");
    const button = screen.getByText("다음");
    return {
      input,
      button,
    };
  };
  //UI
  //테스트 이름 : when_given_then
  //when: 어떠 행동을 했는지
  //given : 어떤 조건에서 이 일이일어나는지
  //then : given과 같은 조건에서 when을 했을때 어떤일이 일어날것인지
  it("onRenderComponent_hasInputAndButton", () => {
    const { input, button } = setup();
    expect(input).toBeTruthy(); //input 확인
    expect(button).toBeTruthy(); //button 확인
    //어떤 버튼인지 구체화
  });

  //input 상태 관리
  it("onUserInput_changesInputValue", () => {
    const { input } = setup();
    const user_input = "email";
    fireEvent.change(input, {
      target: {
        value: user_input,
      },
    });
    expect(input).toHaveAttribute("value", user_input);
  });

  //미입력 테스트
  it("onClickSubmit_hasNoInput_alert", async () => {
    const { button } = setup();
    fireEvent.click(button);
    //View에서 text를 변수화하면
    //텍스트가 바꼈을때 test가 성공/실패하고싶은지에 따라 다르게 작성가능
    const alert = await waitFor(() =>
      screen.findByText("항목을 모두 입력해주세요."),
    );
    expect(alert).toBeInTheDocument();
  });

  //회원 아닐 경우 테스트
  it("onClickSubmit_isNotMember_alertAndChangeButtonText", async () => {
    const { input, button } = setup();
    fireEvent.change(input, {
      target: {
        value: "email",
      },
    });
    //이미 테스트한것 테스트 x, 명시한 테스트만 수행
    //expect(input).toHaveAttribute("value", "email");
    fireEvent.click(button);
    const changeButton = await waitFor(() =>
      screen.findByRole("button", { title: "이메일로 가입하기" }),
    );
    const alert = await waitFor(() =>
      screen.findByText("등록되지 않은 이메일입니다."),
    );
    expect(changeButton).toBeInTheDocument();
    expect(alert).toBeInTheDocument();
  });

  //회원일 경우 테스트
  it("onClickSubmit_isMember_movePageToPassword", async () => {
    const { input, button } = setup();
    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });
    expect(input).toHaveAttribute("value", "test");

    //비밀번호 창으로 이동
    userEvent.click(button);
    expect(history.location.pathname).toBe("/Password");
  });

  //추가 : input이 이메일이 아닌 경우
});

const theme = {
  palette: {
    primary2: "#0eb6fe",
    primary1: "#00d8ec",
    white: "#ffffff",
    primary3: "#0086e7",
    inversed2: "#eeeeee",
    inversed1: "#fafafa",
    default2: "#4a4a4a",
    inversed3: "#cdcdcd",
    default1: "#707070",
    secondary2: "#84f32d",
    default3: "#1a1a1a",
    secondary1: "#9df557",
    secondary3: "#6be30d",
    red: "#f24125",
  },
};
