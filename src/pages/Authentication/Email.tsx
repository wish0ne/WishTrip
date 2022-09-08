import styled from "styled-components";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";

const StyledContainer = styled.div`
  padding: 5.8rem 2.4rem;
`;

function Email() {
  return (
    <StyledContainer>
      <Header type="email" />
      <Input title="이메일" type="email" />
      <Button type="email" />
    </StyledContainer>
  );
}

export default Email;
