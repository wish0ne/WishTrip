import styled from "styled-components";
import CreateHeader from "./components/CreateHeader";
import ImagePicker from "./components/ImagePicker";
import WriteContent from "./components/WriteContent";
import WriteTag from "./components/WriteTag";

const StyledCreate = styled.div``;

function ARCreate() {
  return (
    <StyledCreate>
      <CreateHeader />
      <ImagePicker />
      <WriteTag />
      <WriteContent />
    </StyledCreate>
  );
}
export default ARCreate;
