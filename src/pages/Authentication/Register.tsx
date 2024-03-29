import styled from "styled-components";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/authentication";
import Term from "./components/Term";
import { useState } from "react";

const StyledContainer = styled.div`
  padding: 5.8rem 2.4rem;
`;

const Alert = styled.div`
  padding: 0.8rem 0;
  font-family: "Medium";
  font-size: 1.2rem;
  color: red;
`;

function Register() {
  const [auth, setAuth] = useRecoilState(authState);
  const { alert } = auth;
  const [serviceAgreement, setServiceAgreement] = useState(false);
  const [marketingAgreement, setMarketingAgreement] = useState(false);
  return (
    <StyledContainer>
      <Header>이메일로 가입하기</Header>
      <Input type="password" id="password">
        비밀번호
      </Input>
      <Input type="password" id="password_check">
        비밀번호 확인
      </Input>
      <Input type="text" id="name">
        이름
      </Input>
      <Input type="text" id="username">
        닉네임
      </Input>
      {alert.empty && <Alert>항목을 모두 입력해주세요.</Alert>}
      {!alert.pwEqual && <Alert>비밀번호가 일치하지 않습니다.</Alert>}
      {alert.sameName && <Alert>중복된 이메일입니다.</Alert>}
      {alert.noAgree && <Alert>필수 약관에 동의해주세요.</Alert>}
      <Button type="register" title="가입하기" />
      <Term
        id="service"
        agree={serviceAgreement}
        onClick={() => {
          setAuth({
            ...auth,
            agree: !serviceAgreement,
            alert: { ...auth.alert, noAgree: false },
          });
          setServiceAgreement(!serviceAgreement);
        }}
      >
        위시트립 서비스 약관에 동의합니다.
      </Term>
      <Term
        id="marketing"
        agree={marketingAgreement}
        onClick={() => {
          setMarketingAgreement(!marketingAgreement);
        }}
      >
        마케팅 정보 수신에 동의합니다. (선택)
      </Term>
    </StyledContainer>
  );
}

export default Register;
