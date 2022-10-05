import styled from "styled-components";

const StyledUser = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: center;
  height: 3.6rem;
  > img {
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 3.6rem;
    auto-fit: cover;
  }
  > div {
    display: flex;
    flex-direction: column;
    font-family: "Medium";
    margin-left: 2rem;
    height: 100%;
    justify-content: space-evenly;
    > h3 {
      font-size: 1.4rem;
      color: ${(props) => props.theme.palette.default1};
    }
    > span {
      font-size: 1.2rem;
      color: ${(props) => props.theme.palette.inversed3};
    }
  }
`;

function User({
  username,
  count,
  icon,
}: {
  username: string;
  count: number;
  icon: string;
}) {
  return (
    <StyledUser>
      <img src={icon} alt="유저 아이콘" />
      <div>
        <h3>{username}</h3>
        <span>게시물 {count}개</span>
      </div>
    </StyledUser>
  );
}
export default User;
