import styled from "styled-components";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";

const StyledContainer = styled.div`
  padding: 5.8rem 2.4rem;
`;

function Register() {
  return (
    <StyledContainer>
      <Header type="register" />
      <Input title="비밀번호" type="password" />
      <Input title="비밀번호 확인" type="password" />
      <Input title="이름" type="text" />
      <Input title="닉네임" type="text" />
      <Button type="register" />
    </StyledContainer>
  );
}

export default Register;
