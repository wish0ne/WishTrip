import styled from "styled-components";

const StyledImage = styled.div`
  width: 100%;
  height: 50rem;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Image({ image }: { image: string }) {
  return (
    <StyledImage>
      <img src={image} alt="post 이미지" />
    </StyledImage>
  );
}

export default Image;
