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
import { ReactComponent as Submit } from "../../assets/images/uil_message.svg";
import { dataURItoBlob } from "../../modules/dataURItoBlob";
import { useCallback, useState } from "react";
import Loading from "../components/Loading";

const StyledCreate = styled.div``;

const Line = styled.div`
  height: 0.1rem;
  background-color: ${(props) => props.theme.palette.inversed2};
`;

function Create() {
  const [loading, setLoading] = useState(false);
  const hashTags = useRecoilValue(hashTagsAuto);
  const arCreate = useRecoilValue(arCreatePost);
  const resetARCreat = useResetRecoilState(arCreatePost);
  const resetContentTag = useResetRecoilState(arContentTag);
  const navigate = useNavigate();

  const createPost = useCallback((formData: FormData) => {
    setLoading(true);
    instance
      .put("/post/create", formData)
      .then((res) => {
        //작성 state 초기화
        resetARCreat();
        resetContentTag();
        navigate(-1);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleSubmit = () => {
    html2canvas(document.querySelector("#arNewPost"), {
      backgroundColor: null,
    })
      .then((canvas) => {
        let img = dataURItoBlob(canvas.toDataURL("image/png"));

        //ar create http request
        const formData = new FormData();
        formData.append("file", img, "file.png");
        if (arCreate.image)
          formData.append("image", arCreate.image, "image.png");
        formData.append("post_name", arCreate.title);
        formData.append("post_contents", arCreate.body);
        arCreate.tags.forEach((tag, idx) => {
          formData.append(`tag${idx + 1}`, tag);
        });
        // formData.append("x_value", arCreate.x.toString());
        // formData.append("y_value", arCreate.y.toString());
        // formData.append("z_value", arCreate.z.toString());
        //formData.append("date", new Date().toString());

        return formData;
      })
      .then((formData) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          formData.append("x_value", coords.latitude.toString());
          formData.append("y_value", coords.longitude.toString());
          formData.append(
            "z_value",
            coords.altitude ? coords.altitude.toString() : "0",
          );
          createPost(formData);
        });
      })
      .catch((err) => {
        throw err;
      });
  };
  if (loading) return <Loading>AR 포스트 작성중...</Loading>;
  return (
    <StyledCreate>
      <Header title="새 포스트">
        <Submit onClick={handleSubmit} width="2rem" height="2rem" />
      </Header>
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
export default Create;
