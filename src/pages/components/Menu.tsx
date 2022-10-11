import React, { useEffect } from "react";
import styled from "styled-components";

const StyledMenu = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(26, 26, 26, 0.5);
  padding: 2.4rem;
  box-sizing: border-box;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const Content = styled.div`
  background-color: white;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  & + & {
    margin-top: 1.6rem;
  }
`;

const Button = styled.button`
  font-family: "Medium";
  border: none;
  color: ${(props) => props.theme.palette.default2};
  padding: 1.8rem 1.2rem;
  border-radius: 1.6rem;
  width: 100%;
  box-sizing: border-box;
`;

export function ModalMenu({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <Button onClick={onClick}>{children}</Button>;
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>;
}

function Menu({ children }: { children: React.ReactNode }) {
  //Modal 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <StyledMenu>
      <div>{children}</div>
    </StyledMenu>
  );
}

export default Menu;
