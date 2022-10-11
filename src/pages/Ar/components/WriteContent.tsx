import styled from "styled-components";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { arCreatePost } from "../../../recoil/ar";

const StyledWriteContent = styled.div`
  border-bottom: solid 0.1rem;
  border-color: ${(props) => props.theme.palette.inversed2};
  padding: 2rem 2.4rem;
  & input {
    border: none;
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    padding: 0;
    margin-bottom: 2rem;
    font-family: "Medium";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.default2};
  }
  & input::placeholder {
    color: ${(props) => props.theme.palette.default2};
  }
  & textarea {
    border: none;
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    padding: 0;
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.default1};
    overflow-y: hidden;
    resize: none;
  }
  & textarea:focus {
    outline: none;
  }
  & textarea::placeholder {
    color: ${(props) => props.theme.palette.default1};
  }
`;

function WriteContent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [arCreate, setARCreate] = useRecoilState(arCreatePost);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //입력에 따라 input창 크기 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "1.8rem";
      let height = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${height * 0.1}rem`;
    }
    //내용 입력
    setARCreate({ ...arCreate, body: e.target.value });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setARCreate({ ...arCreate, title: e.target.value });
  };

  return (
    <StyledWriteContent>
      <input
        type="text"
        placeholder="제목 입력..."
        maxLength={100}
        onChange={handleTitle}
      />
      <textarea
        placeholder="내용 입력..."
        onChange={handleInput}
        ref={textareaRef}
        value={arCreate.body}
      />
    </StyledWriteContent>
  );
}

export default WriteContent;
