import styled from "styled-components";

const StyledContent = styled.div`
  position: relative;
  flex-basis: 15rem;
  flex-grow: 1;
  width: 15rem;
  height: 15rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.8rem;
  }
  div {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 1.2rem;
    left: 1.2rem;
    span {
      font-family: "ExtraBold";
      color: white;
      font-size: 1.3rem;
    }
    span + span {
      font-family: "Medium";
      font-size: 1.2rem;
    }
  }
`;

interface ContentPropsType {
  image: string;
  title: string;
  user: string;
}

function Content({ image, title, user }: ContentPropsType) {
  return (
    <StyledContent>
      <img src={image} alt="마이페이지 컨텐츠 미리보기" />
      <div>
        <span>{title}</span>
        <span>{user}</span>
      </div>
    </StyledContent>
  );
}

export default Content;
