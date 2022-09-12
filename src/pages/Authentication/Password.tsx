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

function Password() {
  const { alert } = useRecoilValue(authState);
  return (
    <StyledContainer>
      <Header type="password" />
      <Input title="비밀번호" type="password" id="password" />
      {alert.pwWrong && <Alert>올바르지 않은 비밀번호입니다.</Alert>}
      {alert.empty && <Alert>항목을 모두 입력해주세요.</Alert>}

      <Button type="password" title="로그인" />
    </StyledContainer>
  );
}

export default Password;
