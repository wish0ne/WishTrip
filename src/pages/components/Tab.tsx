import { useState } from "react";
import styled from "styled-components";

interface Props {
  focus: boolean;
}

const StyledTab = styled.nav`
  margin: 2rem 0;
`;

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

interface TabProps {
  tabs: { title: string; id: string }[];
  request: (id: string) => void;
}

function Tab({ tabs, request }: TabProps) {
  const [nowTab, setNowTab] = useState<string>(tabs[0].id);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let newTab: null | string = null;
    if (e.currentTarget.dataset.idx) {
      newTab = e.currentTarget.dataset.idx;
    }
    if (newTab !== null) {
      setNowTab(newTab);
      request(newTab);
    }
  };
  return (
    <StyledTab>
      {tabs.map(({ title, id }) => (
        <Button
          focus={nowTab === id}
          onClick={handleClick}
          key={id}
          data-idx={id}
        >
          {title}
        </Button>
      ))}
    </StyledTab>
  );
}

export default Tab;
