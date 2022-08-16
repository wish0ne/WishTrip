import styled from "styled-components";
import { useRef } from "react";

const StyledWriteContent = styled.div`
  border-top: solid 0.1rem;
  border-bottom: solid 0.1rem;
  border-color: ${(props) => props.theme.palette.inversed2};
  padding: 2rem 2.4rem;
  & textarea {
    border: none;
    width: 100%;
    height: 1.8rem;
    box-sizing: border-box;
    padding: 0;
    font-family: "Medium";
    font-size: 1.4rem;
    color: ${(props) => props.theme.palette.default2};
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

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "1.8rem";
      let height = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${height * 0.1}rem`;
    }
  };
  return (
    <StyledWriteContent>
      <textarea
        placeholder="내용 입력..."
        onChange={handleResize}
        ref={textareaRef}
      />
    </StyledWriteContent>
  );
}

export default WriteContent;
