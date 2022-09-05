import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { ReactComponent as Arrow } from "../../../assets/images/tabler_arrow-left.svg";
import { ReactComponent as Submit } from "../../../assets/images/uil_message.svg";
import { arModal, arPosts } from "../../../recoil/ar";
import post from "../../../assets/images/image-download2.png";
import img2 from "../../../assets/images/경희대2.jpg";
import img9 from "../../../assets/images/여행사진9.jpg";

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
  const [posts, setPosts] = useRecoilState(arPosts);
  const [modal, setModal] = useRecoilState(arModal);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (posts.length === 1) {
      setPosts(
        posts.concat({
          id: 2,
          latitude: 37.247136,
          longitude: 127.078262,
          image: post,
        }),
      );
    }
    setModal({
      id: 1,
      image: img2,
      body: "저도 정문에서 한컷!",
      emotions: {},
      tags: ["경희대", "정문"],
      user_img: img9,
      user_nickname: "소마",
      date: "2022.08.25",
      comments: [],
    });

    html2canvas(document.querySelector(".arCreatePost"), {
      backgroundColor: null,
    }).then((canvas) => {
      let img = canvas.toDataURL("image/png");
      //img = img.replace("data:image/png;base64,", "");

      // let link = document.createElement("a");
      // document.body.appendChild(link);
      // link.href = img;
      // link.download = "image-download.png";
      // link.click();
      // document.body.removeChild(link);
    });
    navigate("/ARTrip");
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
