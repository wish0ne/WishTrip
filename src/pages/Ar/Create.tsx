import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { hashTagsAuto } from "../../recoil/common";
import CreateHeader from "./components/CreateHeader";
import ImagePicker from "./components/ImagePicker";
import WriteContent from "./components/WriteContent";
import HashAuto from "./components/HashAuto";
import WriteTag from "./components/WriteTag";

const StyledCreate = styled.div``;

const Line = styled.div`
  height: 0.1rem;
  background-color: ${(props) => props.theme.palette.inversed2};
`;

function ARCreate() {
  const hashTags = useRecoilValue(hashTagsAuto);
  return (
    <StyledCreate>
      <CreateHeader />
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
