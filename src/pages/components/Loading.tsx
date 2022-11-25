import { ReactNode } from "react";
import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";

const LoadingBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > span {
    font-family: SemiBold;
    font-size: 1.5rem;
    color: black;
    margin-top: 2rem;
  }
`;

interface LoadingProps {
  children: ReactNode;
}

const Loading = ({ children }: LoadingProps) => {
  return (
    <LoadingBlock>
      <MutatingDots
        height="100"
        width="100"
        color="#0eb6fe"
        secondaryColor="#00d8ec"
        ariaLabel="three-dots-loading"
      />
      <span>{children}</span>
    </LoadingBlock>
  );
};

export default Loading;
