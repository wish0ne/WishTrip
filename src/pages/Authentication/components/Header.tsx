import styled from "styled-components";

const StyledHeader = styled.h1`
  font-family: "ExtraBold";
  font-size: 2.1rem;
  margin-bottom: 2rem;
  margin-top: 0;
  color: ${(props) => props.theme.palette.default3};
`;

function Header({ children }: { children: React.ReactNode }) {
  return <StyledHeader>{children}</StyledHeader>;
}

export default Header;
