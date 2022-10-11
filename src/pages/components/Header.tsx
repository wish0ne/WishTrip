import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/images/uil_arrow-left.svg";

const StyledHeader = styled.div`
  height: 5.6rem;
  padding: 0.8rem 1.2rem;
  > div {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    h1 {
      width: 100%;
      text-align: center;
      font-family: "ExtraBold";
      font-size: 1.6rem;
      line-height: 2rem;
      color: ${(props) => props.theme.palette.default2};
    }
  }
`;

const StyledArrow = styled(Arrow)`
  position: absolute;
  left: 0;
`;

const Children = styled.div`
  position: absolute;
  right: 0;
`;

interface HeaderPropsType {
  title: string;
  children?: React.ReactNode;
}

function Header({ title, children }: HeaderPropsType) {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div>
        <StyledArrow
          width="2.4rem"
          height="2.4rem"
          fill="rgb(74, 74, 74)"
          onClick={() => navigate(-1)}
        />
        <h1>{title}</h1>
        <Children>{children}</Children>
      </div>
    </StyledHeader>
  );
}

export default Header;
