import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Delete } from "../../../assets/images/uil_multiply.svg";

const StyledWriteTag = styled.div`
  padding: 2rem 2.4rem;

  & input {
    border: none;
    font-family: "Medium";
    font-size: 1.4rem;
    width: 100%;
    color: ${(props) => props.theme.palette.primary3};
    margin-top: 2rem;
  }
  & input:focus {
    outline: none;
  }
  & input::placeholder {
    color: ${(props) => props.theme.palette.primary3};
  }
`;
const Tag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.8rem;
  & div {
    background-color: ${(props) => props.theme.palette.primary3};
    border-radius: 1.6rem;
    padding: 0.6rem 1rem;
    display: flex;
    align-items: center;
    height: 1.6rem;
    span {
      font-family: "Medium";
      color: white;
      font-size: 1.2rem;
      letter-spacing: -0.024rem;
    }
  }
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 0.6rem;
  height: 1.6rem;
`;

function WriteTag() {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      //한글 중복 입력 문제 해결
      if (e.nativeEvent.isComposing === false) {
        //태그 중복 입력 방지
        if (!tags.includes(tag)) setTags(tags.concat(tag));
        setTag("");
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTags(tags.filter((tag) => tag !== e.currentTarget.dataset.tag));
  };
  return (
    <StyledWriteTag>
      <Tag>
        {tags.map((tag) => (
          <div key={tag}>
            <span>#{tag}</span>
            <DeleteBtn onClick={handleDelete} data-tag={tag}>
              <Delete width="1.6rem" height="1.6rem" />
            </DeleteBtn>
          </div>
        ))}
      </Tag>
      <input
        type="text"
        placeholder="태그 추가..."
        onKeyDown={handleEnter}
        value={tag}
        onChange={handleInput}
      />
    </StyledWriteTag>
  );
}

export default WriteTag;
