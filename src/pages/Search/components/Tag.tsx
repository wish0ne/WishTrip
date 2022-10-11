import styled from "styled-components";
import { ReactComponent as Hashtag } from "../../../assets/images/hashtag.svg";

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  height: 3.6rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: "Medium";
  font-size: 1.2rem;
  height: 100%;
  color: ${(props) => props.theme.palette.inversed3};
  > h3 {
    color: ${(props) => props.theme.palette.default1};
  }
`;

const Icon = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  background-color: ${(props) => props.theme.palette.inversed1};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.2rem;
`;

function Tag({ tag, count }: { tag: string; count: number }) {
  return (
    <StyledTag>
      <Icon>
        <Hashtag width="2rem" height="2rem" fill="rgb(112, 112, 112)" />
      </Icon>
      <Title>
        <h3>{tag}</h3>
        <span>게시물 {count}개</span>
      </Title>
    </StyledTag>
  );
}
export default Tag;
