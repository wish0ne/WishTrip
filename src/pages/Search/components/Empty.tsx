import styled from "styled-components";

const StyledEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "SemiBold";
  font-size: 1.6rem;
  padding: 5rem;
  color: ${(props) => props.theme.palette.default1};
`;

function Empty() {
  return <StyledEmpty>검색 결과가 없습니다.</StyledEmpty>;
}
export default Empty;
