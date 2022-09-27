import styled from "styled-components";
import { ReactComponent as Hashtag } from "../../../assets/images/hashtag.svg";

const StyledTag = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Medium";
  font-size: 1.2rem;
  color: ${(props) => props.theme.palette.inversed3};
  > h3 {
    margin-bottom: 0.2rem;
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

function Tag() {
  return (
    <StyledTag>
      <Icon>
        <Hashtag width="2rem" height="2rem" fill="rgb(112, 112, 112)" />
      </Icon>
      <Title>
        <h3>여행</h3>
        <span>게시물 312개</span>
      </Title>
    </StyledTag>
  );
}
export default Tag;
