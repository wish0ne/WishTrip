import styled from "styled-components";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";

const StyledContainer = styled.div`
  padding: 5.8rem 2.4rem;
`;

function Password() {
  return (
    <StyledContainer>
      <Header type="password" />
      <Input title="비밀번호" type="password" id="password" />
      <Button type="password" title="로그인" />
    </StyledContainer>
  );
}

export default Password;
