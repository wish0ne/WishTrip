import { useNavigate } from "react-router-dom";
import { ReactComponent as Hand } from "../../assets/images/hand_fingers.svg";
import styled from "styled-components";

export const StyledUser = styled(User)``;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
  }
`;

export const Icon = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3.6rem;
  margin-right: 1.6rem;
`;

export const NoIcon = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3.6rem;
  margin-right: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.inversed1};
  & > svg {
    width: 50%;
    height: 50%;
  }
`;

export const Info = styled.div`
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

const Children = styled.div``;

export interface UserPropsType {
  className: string;
  icon: string | null;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  notMove?: boolean;
  children?: React.ReactNode;
}

function User({
  className,
  icon,
  title,
  subtitle,
  onClick,
  notMove,
  children,
}: UserPropsType) {
  const navigate = useNavigate();
  return (
    <Container className={className}>
      <div
        onClick={() => {
          if (onClick) onClick();
          //유저 프로필로 이동
          //마이페이지, 유저프로필에서는 이동하지 않음
          if (!notMove) navigate(`../Profile/${title}`);
        }}
      >
        {icon ? (
          <Icon src={icon} alt="유저 아이콘" />
        ) : (
          <NoIcon>
            <Hand width="3.6rem" height="3.6rem" />
          </NoIcon>
        )}
        <Info>
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
        </Info>
      </div>
      <Children>{children}</Children>
    </Container>
  );
}

export default User;
