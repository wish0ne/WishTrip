import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import { ReactComponent as Delete } from "../../../assets/images/uil_multiply.svg";
import { arContentTag, arCreatePost } from "../../../recoil/ar";
import instance from "../../../modules/api";
import { hashTagsAuto } from "../../../recoil/common";

const StyledWriteTag = styled.div`
  padding: 2rem 2.4rem;
  border-bottom: solid 0.1rem ${(props) => props.theme.palette.inversed2};
  & input {
    border: none;
    font-family: "Medium";
    font-size: 1.4rem;
    width: 100%;
    padding: 0;
    color: ${(props) => props.theme.palette.primary3};
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
  & br {
    height: 2rem;
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
  const [arCreate, setARCreate] = useRecoilState(arCreatePost);
  const [contentTag, setContentTag] = useRecoilState(arContentTag);
  const setHash = useSetRecoilState(hashTagsAuto);
  const [tag, setTag] = useState<string>(""); //작성중인 태그

  //태그 추가
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      //한글 중복 입력 문제 해결
      if (e.nativeEvent.isComposing === false) {
        //태그 중복 입력 방지
        if (!arCreate.tags.includes(tag)) {
          setARCreate({ ...arCreate, tags: arCreate.tags.concat(tag) });
          //ar 컨텐츠용 태그 추가
          if (tag.length > 7)
            setContentTag(contentTag.concat(tag.slice(0, 7) + "..."));
          else setContentTag(contentTag.concat(tag));
        }
        setTag("");
      }
    }
  };

  //태그 입력
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    instance
      .get(`/msw/hashtag`, {
        params: {
          tag: e.target.value,
        },
      })
      .then(({ data }) => {
        setHash(data);
      });
    setTag(e.target.value);
  };

  //태그 삭제
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    let deleteTag = e.currentTarget.dataset.tag;
    setARCreate({
      ...arCreate,
      tags: arCreate.tags.filter((tag) => tag !== deleteTag),
    });
    if (deleteTag && deleteTag.length > 7) {
      setContentTag(
        contentTag.filter((tag) => tag !== deleteTag!.slice(0, 7) + "..."),
      );
    } else {
      setContentTag(contentTag.filter((tag) => tag !== deleteTag));
    }
  };
  return (
    <StyledWriteTag>
      <Tag>
        {arCreate.tags.map((tag) => (
          <div key={tag}>
            <span>#{tag}</span>
            <DeleteBtn onClick={handleDelete} data-tag={tag}>
              <Delete width="1.6rem" height="1.6rem" fill="white" />
            </DeleteBtn>
          </div>
        ))}
      </Tag>
      {arCreate.tags.length > 0 && <br />}
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
