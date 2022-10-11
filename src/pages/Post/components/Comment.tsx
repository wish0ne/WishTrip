import styled from "styled-components";

const StyledComment = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  & img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 4rem;
    margin-right: 1.2rem;
  }
  > div {
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      margin-bottom: 0.6rem;
      & h2 {
        font-family: "ExtraBold";
        font-size: 1.3rem;
        color: ${(props) => props.theme.palette.default2};
        margin-right: 0.4rem;
      }
      & h6 {
        font-family: "Medium";
        font-size: 1.2rem;
        color: ${(props) => props.theme.palette.default1};
      }
    }
    > article {
      font-family: "Medium";
      font-size: 1.3rem;
      color: ${(props) => props.theme.palette.default2};
    }
  }
`;

function Comment({
  icon,
  username,
  body,
  date,
}: {
  icon: string;
  username: string;
  body: string;
  date: Date;
}) {
  return (
    <StyledComment>
      <img src={icon} alt="유저 아이콘" />
      <div>
        <div>
          <h2>{username}</h2>
          <h6>{date.toString()}</h6>
        </div>
        <article>{body}</article>
      </div>
    </StyledComment>
  );
}

export default Comment;
