import styled from "styled-components";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authentication";

const StyledContainer = styled.div`
  padding: 5.8rem 2.4rem;
`;

function Email() {
  const { isMember } = useRecoilValue(authState);
  return (
    <StyledContainer>
      <Header type="email" />
      <Input title="이메일" type="email" id="email" />
      <Button
        type="email"
        title={isMember === false ? "이메일로 가입하기" : "다음"}
      />
    </StyledContainer>
  );
}

export default Email;
