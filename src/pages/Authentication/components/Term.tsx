import styled from "styled-components";
import { ReactComponent as Check } from "../../../assets/images/uil_check.svg";

const StyledTerm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  margin-top: 1.2rem;
  & > span {
    font-family: "Medium";
    font-size: 1.4rem;
    lien-height: 2.2rem;
    color: ${(props) => props.theme.palette.default1};
  }
`;

const Label = styled.label`
  & > div {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.6rem;
    background-color: ${(props) => props.theme.palette.inversed1};
    margin-right: 1.2rem;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;

function Term({
  children,
  id,
  agree,
  onClick,
}: {
  children: React.ReactNode;
  id: string;
  agree: boolean;
  onClick: () => void;
}) {
  return (
    <StyledTerm>
      <Label htmlFor={id} onClick={onClick}>
        <div>
          <Check
            width="2rem"
            height="2rem"
            fill={agree ? "rgb(14, 182, 254)" : "rgb(205, 205, 205)"}
          />
        </div>
      </Label>
      <Input type="button" id={id} />
      <span>{children}</span>
    </StyledTerm>
  );
}

export default Term;
