import styled from "styled-components";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authentication";

const StyledContainer = styled.div`
  padding: 5.8rem 2.4rem;
`;

const Alert = styled.div`
  padding: 0.8rem 0;
  font-family: "Medium";
  font-size: 1.2rem;
  color: red;
`;

function Email() {
  const { alert } = useRecoilValue(authState);
  return (
    <StyledContainer>
      <Header>이메일로 시작하기</Header>
      <Input title="이메일" type="email" id="email" />
      {!alert.isMember && <Alert>등록되지 않은 이메일입니다.</Alert>}
      {alert.empty && <Alert>항목을 모두 입력해주세요.</Alert>}
      <Button
        type="email"
        title={alert.isMember === false ? "이메일로 가입하기" : "다음"}
      />
    </StyledContainer>
  );
}

export default Email;
