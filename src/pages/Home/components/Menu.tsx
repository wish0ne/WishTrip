import styled from "styled-components";
import { Link } from "react-router-dom";

const titles = [
  { title: "AR여행", route: "ARTrip" },
  { title: "기록하기", route: "ARTrip" },
  { title: "검색하기", route: "ARTrip" },
  { title: "마이페이지", route: "Mypage" },
];

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
        <Button to={`/${title.route}`} key={title.title}>
          <img
            src={require(`../../../assets/images/${title.title}/${title.title}@2x.jpg`)}
            alt={title.title}
          />
          <span>{title.title}</span>
        </Button>
      ))}
    </StyledMenu>
  );
}
export default Menu;
