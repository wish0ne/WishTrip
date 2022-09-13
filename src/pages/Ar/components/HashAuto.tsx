import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ReactComponent as Hash } from "../../../assets/images/hashtag.svg";
import { arCreatePost } from "../../../recoil/ar";

const StyledHashAuto = styled.div`
  padding: 2rem;
  border-top: solid 0.1rem ${(props) => props.theme.palette.inversed2};
  display: flex;
  align-items: center;
  > span {
    font-family: "Medium";
    font-size: 1.6rem;
    color: ${(props) => props.theme.palette.primary3};
    margin-left: 2rem;
    line-height: 1.7rem;
  }
`;

interface HashAutoProps {
  tag: string;
}

function HashAuto({ tag }: HashAutoProps) {
  const [arCreate, setARCreate] = useRecoilState(arCreatePost);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.currentTarget.children[1].innerHTML);
    setARCreate({
      ...arCreate,
      tags: arCreate.tags.concat(e.currentTarget.children[1].innerHTML),
    });
  };
  return (
    <StyledHashAuto onClick={handleClick}>
      <Hash width="1.7rem" height="1.7rem" />
      <span>{tag}</span>
    </StyledHashAuto>
  );
}
export default HashAuto;
