import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { ReactComponent as Camera } from "../../../assets/images/uil_camera-plus.svg";
import { arCreateTags } from "../../../recoil/ar";

const StyledPicker = styled.div`
  height: 17.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;
const AddImage = styled.div`
  position: relative;
  & > div {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & input {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
    z-index: 10;
  }
  & figure {
    height: 14rem;
    width: 10.5rem;
    border-radius: 1rem 1rem 0 0;
    border: solid 0.3rem white;
    position: relative;
    img {
      height: 14rem;
      width: 10.5rem;
      border-radius: 1rem 1rem 0 0;
      object-fit: cover;
    }
    > div {
      position: absolute;
      bottom: -1.2rem;
      right: -1.2rem;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 0.4rem 0;
      span {
        display: inline-block;
        background: linear-gradient(
          to top,
          rgba(0, 134, 231, 1),
          rgba(0, 134, 231, 0.4)
        );
        box-shadow: 0.2rem 0.4rem 0.8rem rgba(33, 255, 202, 0.4) inset,
          0 0.4rem 0.8rem rgba(0, 146, 252, 0.25);
        font-family: "SemiBold";
        font-size: 1.1rem;
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 1.2rem;
        max-width: 9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

interface ARPostType {
  image: File | null;
  body: string;
  tag: string[];
}

function ImagePicker() {
  const [post, setPost] = useState<ARPostType>({
    image: null,
    body: "",
    tag: [],
  });
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPost({ ...post, image: e.target.files[0] });
  };

  const tags = useRecoilValue(arCreateTags);
  return (
    <StyledPicker>
      <AddImage>
        {post.image ? (
          <figure>
            <img src={URL.createObjectURL(post.image)} alt="AR post" />
            <div>
              {tags.map(
                (tag, idx) =>
                  idx < 3 && (
                    <div key={tag}>
                      <span>#{tag}</span>
                    </div>
                  ),
              )}
            </div>
          </figure>
        ) : (
          <div>
            <Camera />
          </div>
        )}
        <label htmlFor="ARImage" />
        <input type="file" id="ARImage" onChange={handleImage} />
      </AddImage>
    </StyledPicker>
  );
}
export default ImagePicker;
