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

function Register() {
  const { alert } = useRecoilValue(authState);
  return (
    <StyledContainer>
      <Header type="register" />
      <Input title="비밀번호" type="password" id="password" />
      <Input title="비밀번호 확인" type="password" id="password_check" />
      <Input title="이름" type="text" id="name" />
      <Input title="닉네임" type="text" id="username" />
      {alert.empty && <Alert>항목을 모두 입력해주세요.</Alert>}
      {!alert.pwEqual && <Alert>비밀번호가 일치하지 않습니다.</Alert>}
      {alert.sameName && <Alert>중복된 닉네임입니다.</Alert>}
      <Button type="register" title="가입하기" />
    </StyledContainer>
  );
}

export default Register;
