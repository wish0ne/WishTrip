import styled from "styled-components";
import img9 from "../../../assets/images/여행사진9.jpg";

const StyledInput = styled.div`
  display: flex;
  margin: 2.8rem 0;
  align-items: center;
  & img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 4rem;
    margin-right: 1.2rem;
  }
  & input {
    padding: 0.9rem 1.2rem;
    border: none;
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.default2};
    flex-grow: 1;
  }
  & input:focus {
    outline: none;
  }
`;

function CommentInput() {
  return (
    <StyledInput>
      <img src={img9} alt="유저 아이콘" />
      <input placeholder="댓글 달기.." type="text" />
    </StyledInput>
  );
}

export default CommentInput;
