import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import instance from "../../../modules/api";
import { homeProfile } from "../../../recoil/home";

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

const UserIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 4rem;
  margin-right: 1.2rem;
`;

function CommentInput({ post_id }: { post_id: string | undefined }) {
  const profile = useRecoilValue(homeProfile);
  const [input, setInput] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //댓글 작성
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      //한글 중복 입력 문제 해결
      if (e.nativeEvent.isComposing === false) {
        if (post_id) {
          instance
            .post("/msw/post/comment/add", {
              post_id: post_id,
              comment: input,
              date: new Date(),
            })
            .catch((err) => {
              throw err;
            });
          setInput("");
        }
      }
    }
  };
  return profile ? (
    <StyledInput>
      <UserIcon src={profile} alt="유저아이콘" />
      <input
        placeholder="댓글 달기.."
        type="text"
        onChange={handleInput}
        onKeyDown={handleEnter}
        value={input}
      />
    </StyledInput>
  ) : (
    <></>
  );
}

export default CommentInput;
