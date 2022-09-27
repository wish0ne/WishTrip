import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/images/tabler_arrow-left.svg";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.palette.inversed1};
  border: none;
  font-family: "Medium";
  font-size: 1.4rem;
  line-height: 2.2rem;
  width: 100%;
  margin-left: 0.8rem;
  padding: 0.9rem 1.6rem;
  &:focus {
    outline: none;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Arrow />
      <Input type="text" placeholder="검색어를 입력해주세요" />
    </StyledHeader>
  );
}
export default Header;
