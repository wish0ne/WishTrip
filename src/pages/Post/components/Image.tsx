import styled from "styled-components";
import img5 from "../../../assets/images/여행사진5.jpg";

const StyledImage = styled.div`
  width: 100%;
  height: 50rem;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Image() {
  return (
    <StyledImage>
      <img src={img5} alt="post 이미지" />
    </StyledImage>
  );
}

export default Image;
