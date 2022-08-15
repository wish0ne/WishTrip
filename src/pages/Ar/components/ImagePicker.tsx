import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Camera } from "../../../assets/images/uil_camera-plus.svg";

const StyledPicker = styled.div`
  height: 17.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AddImage = styled.div`
  position: relative;

  & div {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: #eaeaea;
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

  & img {
    height: 14.4rem;
    width: 10.8rem;
    border-radius: 0.64rem;
    object-fit: cover;
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
  return (
    <StyledPicker>
      <AddImage>
        {post.image ? (
          <img src={URL.createObjectURL(post.image)} alt="AR post" />
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
