import styled from "styled-components";

const StyledContent = styled.div`
  margin: 2rem 0;
  & h1 {
    font-family: "ExtraBold";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default2};
  }
  & article {
    width: 100%;
    font-family: "Medium";
    font-size: 1.4rem;
    line-height: 2rem;
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

function Content({
  title,
  body,
  tags,
}: {
  title: string;
  body: string;
  tags: string[];
}) {
  return (
    <StyledContent>
      <h1>{title}</h1>
      <article>{body}</article>
      {tags.length > 0 && <span>#{tags.join("#")}</span>}
    </StyledContent>
  );
}

export default Content;
