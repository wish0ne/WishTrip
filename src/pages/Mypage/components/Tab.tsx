import styled from "styled-components";
import { useState } from "react";

interface Props {
  focus: boolean;
}

const StyledTab = styled.nav``;

const Button = styled.button<Props>`
  background: none;
  border: none;
  font-family: "SemiBold";
  font-size: 1.4rem;
  color: ${(props) =>
    props.focus ? props.theme.palette.primary3 : props.theme.palette.default1};
  padding: 1rem 0.6rem;
  border-bottom: ${(props) => props.focus && "solid 0.2rem rgb(0 134 231)"};
  & + & {
    margin-left: 1.2rem;
  }
`;

function Tab() {
  const [tab, setTab] = useState<number>(0);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTab(Number(e.currentTarget.dataset.idx));
  };
  return (
    <StyledTab>
      {["스크랩한 글", "최근 본 글", "댓글 단 글"].map((title, index) => (
        <Button
          focus={tab === index}
          onClick={handleClick}
          key={title}
          data-idx={index}
        >
          {title}
        </Button>
      ))}
    </StyledTab>
  );
}

export default Tab;
