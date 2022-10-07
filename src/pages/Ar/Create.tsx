import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { hashTagsAuto } from "../../recoil/common";
import html2canvas from "html2canvas";
import ImagePicker from "./components/ImagePicker";
import WriteContent from "./components/WriteContent";
import HashAuto from "./components/HashAuto";
import WriteTag from "./components/WriteTag";
import Header from "../components/Header";
import { arContentTag, arCreatePost } from "../../recoil/ar";
import instance from "../../modules/api";
import { useNavigate } from "react-router-dom";

const StyledCreate = styled.div``;

const Line = styled.div`
  height: 0.1rem;
  background-color: ${(props) => props.theme.palette.inversed2};
`;

function ARCreate() {
  const hashTags = useRecoilValue(hashTagsAuto);
  const arCreate = useRecoilValue(arCreatePost);
  const resetARCreat = useResetRecoilState(arCreatePost);
  const resetContentTag = useResetRecoilState(arContentTag);
  const navigate = useNavigate();
  const handleSubmit = () => {
    html2canvas(document.querySelector("#arNewPost"), {
      backgroundColor: null,
    })
      .then((canvas) => {
        let img = canvas.toDataURL("image/png");
        //데이터 타입, 인코딩 타입 제외하고 서버로 전송
        //img = img.replace("data:image/png;base64,", "");
        // let link: any = document.createElement("a");
        // document.body.appendChild(link);
        // link.href = img;
        // link.download = "image-download.png";
        // link.click();
        // document.body.removeChild(link);

        //ar create http request
        const formData = new FormData();
        formData.append("files", img);
        formData.append("arpost_contents", arCreate.arpost_contents);
        formData.append("tags", arCreate.tags.toString());
        formData.append("x_value", arCreate.x_value.toString());
        formData.append("y_value", arCreate.y_value.toString());
        formData.append("z_value", arCreate.z_value.toString());

        instance.post("/msw/arpost/create", formData);
      })
      .finally(() => {
        //작성 state 초기화
        resetARCreat();
        resetContentTag();
        navigate(-1);
      });
  };
  return (
    <StyledCreate>
      <Header title="새 포스트" submit handleSubmit={handleSubmit}></Header>
      <ImagePicker />
      <WriteTag />
      {hashTags.map((tag) => (
        <HashAuto tag={tag} key={tag} />
      ))}
      {hashTags.length > 0 && <Line />}
      <WriteContent />
    </StyledCreate>
  );
}
export default ARCreate;
