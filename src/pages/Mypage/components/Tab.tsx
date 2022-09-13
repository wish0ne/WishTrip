import styled from "styled-components";
import instance from "../../../modules/api";
import { useRecoilState } from "recoil";
import { mypageContents } from "../../../recoil/mypage";

interface Props {
  focus: boolean;
}

const StyledTab = styled.nav``;

const Button = styled.button<Props>`
  background: none;
  border: none;
  font-family: "SemiBold";
  font-size: 1.4rem;
  color: ${(props) =>
    props.focus ? props.theme.palette.primary3 : props.theme.palette.default1};
  padding: 1rem 0.6rem;
  border-bottom: ${(props) => props.focus && "solid 0.2rem rgb(0 134 231)"};
  & + & {
    margin-left: 1.2rem;
  }
`;

interface TabProps {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

function Tab({ tab, setTab }: TabProps) {
  const [contents, setContents] = useRecoilState(mypageContents);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let newTab: null | string = null;
    if (e.currentTarget.dataset.idx) {
      newTab = e.currentTarget.dataset.idx;
    }
    if (newTab !== null) {
      setTab(newTab);
      instance.post(`/msw/mypage/${newTab}`).then((data) => {
        if (newTab)
          setContents({
            ...contents,
            [newTab]: data.data,
          });
      });
    }
  };
  return (
    <StyledTab>
      {[
        { title: "스크랩한 글", id: "scrap" },
        { title: "최근 본 글", id: "recent" },
        { title: "댓글 단 글", id: "comment" },
      ].map(({ title, id }) => (
        <Button focus={tab === id} onClick={handleClick} key={id} data-idx={id}>
          {title}
        </Button>
      ))}
    </StyledTab>
  );
}

export default Tab;
