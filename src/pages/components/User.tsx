import styled from "styled-components";

export const StyledUser = styled(User)``;

const Container = styled.div`
  display: flex;
`;

const Icon = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3.6rem;
  margin-right: 1.6rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;

  & h1 {
    font-family: "ExtraBold";
    color: ${(props) => props.theme.palette.default1};
    font-size: 1.4rem;
  }

  & h2 {
    font-family: "Medium";
    color: ${(props) => props.theme.palette.default2};
    font-size: 1.2rem;
  }
`;

export interface UserPropsType {
  className: string;
  icon: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

function User({ className, icon, title, subtitle, onClick }: UserPropsType) {
  return (
    <Container onClick={onClick} className={className}>
      <Icon src={icon} alt="유저 아이콘" />
      <Info>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </Info>
    </Container>
  );
}

export default User;
