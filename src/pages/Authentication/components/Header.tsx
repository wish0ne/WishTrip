import styled from "styled-components";

interface HeaderPropsType {
  type: string;
}

const StyledHeader = styled.h1`
  font-family: "ExtraBold";
  font-size: 2.1rem;
  margin-bottom: 2rem;
  margin-top: 0;
  color: ${(props) => props.theme.palette.default3};
`;

function Header(props: HeaderPropsType) {
  const { type } = props;
  let title = "";
  if (type === "register") title = "이메일로 가입하기";
  else if (type === "email") title = "이메일로 시작하기";
  else title = "비밀번호를 입력해주세요.";

  return <StyledHeader>{title}</StyledHeader>;
}

export default Header;
