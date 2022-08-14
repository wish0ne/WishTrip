import styled from "styled-components";
import { Link } from "react-router-dom";

const titles = ["AR여행", "기록하기", "검색하기", "마이페이지"];

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3.2rem 3rem;
`;

const Button = styled(Link)`
  & img {
    width: 5.6rem;
    height: 5.6rem;
  }

  & span {
    font-family: "SemiBold";
    font-size: 1.3rem;
    color: ${(props) => props.theme.palette.default2};
    margin-top: 0.8rem;
  }
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;

  & + & {
    margin-left: 0.9rem;
  }
`;

function Menu() {
  return (
    <StyledMenu>
      {titles.map((title) => (
        <Button to="/Authentication" key={title}>
          <img
            key={title}
            src={require(`../../../assets/images/${title}/${title}@2x.jpg`)}
            alt={title}
          />
          <span>{title}</span>
        </Button>
      ))}
    </StyledMenu>
  );
}
export default Menu;
