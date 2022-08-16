import styled from "styled-components";

export const StyledUser = styled.div`
  display: flex;
`;

export const Icon = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  margin-right: 1rem;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & span {
    font-family: "ExtraBold";
    color: #ffffff;
    font-size: 1.4rem;
  }

  & span + span {
    font-family: "Medium";
    color: #ffffff;
    font-size: 1.3rem;
  }
`;

export interface UserPropsType {
  icon: string;
  name: string;
  location: string;
}

function User({ icon, name, location }: UserPropsType) {
  return (
    <StyledUser>
      <Icon src={icon} alt="유저 아이콘" />
      <Info>
        <span>{name}</span>
        <span>@{location}</span>
      </Info>
    </StyledUser>
  );
}

export default User;
