import styled from "styled-components";
import CreateHeader from "./components/CreateHeader";
import ImagePicker from "./components/ImagePicker";

const StyledCreate = styled.div``;

function ARCreate() {
  return (
    <StyledCreate>
      <CreateHeader />
      <ImagePicker />
    </StyledCreate>
  );
}
export default ARCreate;
