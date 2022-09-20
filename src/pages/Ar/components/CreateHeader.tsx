import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { ReactComponent as Arrow } from "../../../assets/images/tabler_arrow-left.svg";
import { ReactComponent as Submit } from "../../../assets/images/uil_message.svg";
import { arCreatePost } from "../../../recoil/ar";

const StyledHeader = styled.div`
  display: flex;
  height: 5.6rem;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  & h1 {
    font-family: "ExtraBold";
    font-size: 1.6rem;
    line-height: 2rem;
    color: ${(props) => props.theme.palette.default2};
  }
`;

const BackBtn = styled(Link)``;

function CreateHeader() {
  const [arCreate, setARCreate] = useRecoilState(arCreatePost);
  const navigate = useNavigate();

  const handleSubmit = () => {
    html2canvas(document.querySelector("#arNewPost"), {
      backgroundColor: null,
    }).then((canvas) => {
      let img = canvas.toDataURL("image/png");
      //데이터 타입, 인코딩 타입 제외하고 서버로 전송
      // img = img.replace("data:image/png;base64,", "");

      let link: any = document.createElement("a");
      document.body.appendChild(link);
      link.href = img;
      link.download = "image-download.png";
      link.click();
      document.body.removeChild(link);
    });
    //navigate(-1);
  };
  return (
    <StyledHeader>
      <BackBtn to="/ARTrip">
        <Arrow />
      </BackBtn>
      <h1>새 포스트</h1>
      <Submit onClick={handleSubmit} />
    </StyledHeader>
  );
}

export default CreateHeader;
