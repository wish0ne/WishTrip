import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ReactComponent as Hash } from "../../../assets/images/hashtag.svg";
import { arContentTag, arCreatePost } from "../../../recoil/ar";

const StyledHashAuto = styled.div`
  padding: 2rem;
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
  const [contentTag, setContentTag] = useRecoilState(arContentTag);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //태그 중복 입력 방지
    if (!arCreate.tags.includes(tag)) {
      setARCreate({
        ...arCreate,
        tags: arCreate.tags.concat(tag),
      });
      //ar 컨텐츠용 태그 추가
      if (tag.length > 7)
        setContentTag(contentTag.concat(tag.slice(0, 7) + "..."));
      else setContentTag(contentTag.concat(tag));
    }
  };
  return (
    <StyledHashAuto onClick={handleClick}>
      <Hash width="1.7rem" height="1.7rem" />
      <span>{tag}</span>
    </StyledHashAuto>
  );
}
export default HashAuto;
