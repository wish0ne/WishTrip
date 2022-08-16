import styled from "styled-components";

const StyledUser = styled.div`
  display: flex;
`;

const Icon = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  margin-right: 1rem;
`;
const Info = styled.div`
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

interface UserPropsType {
  icon: string;
  name: string;
  location: string;
}

function User({ icon, name, location }: UserPropsType) {
  return (
    <StyledUser>
      <Icon src={icon} />
      <Info>
        <span>{name}</span>
        <span>@{location}</span>
      </Info>
    </StyledUser>
  );
}

export default User;
