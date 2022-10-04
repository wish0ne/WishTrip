import styled from "styled-components";

const StyledContent = styled.div`
  padding: 0 2.4rem 2.4rem;
  & article {
    width: 100%;
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.default2};
    white-space: pre-line;
    margin: 2rem 0;
  }
  & span {
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.primary3};
  }
`;

function Content() {
  return (
    <StyledContent>
      <article>
        {`오늘은 경희대학교에 방문했어요! 정문이 너무 예뻐서 한 컷 찍어서 올립니다😊 \n\n 혹시 경희대학교에 방문하신다면 제 포스트를 찾아보세요~`}
      </article>
      <span>#부산#치킨#햄버거#도미노피자</span>
    </StyledContent>
  );
}

export default Content;
