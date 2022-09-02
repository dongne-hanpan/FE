import { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Signin = () => {
  //닉네임, 아이디, 비밀번호, 비밀번호확인
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //오류메세지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  //유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  /**유효성 검사 */

  /** 아이디 검사 */
  const idHandler = useCallback((e) => {
    /**소문자 + 숫자 + 언더바/하이픈 허용 4~20자리 */
    const idRegex = /^[a-z0-9_-]{4,20}$/;
    const idCurrent = e.target.value;
    setId(idCurrent);
    if (!idRegex.test(idCurrent)) {
      setIdMessage("소문자 + 숫자 + 언더바/하이픈 허용 4~20자리 :)");
      setIsId(false);
    } else {
      setIdMessage("사용가능");
      setIsId(true);
    }
  }, []);

  /** 비밀번호 검사 */
  const passwordHandler = useCallback((e) => {
    /**숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요! */
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요 :)"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 :)");
      setIsPassword(true);
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isId && isPassword) {
      alert("로그인 완료");
    } else {
      return;
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <InputBox>
        <div>
          <label htmlFor="id">아이디</label>
          {id.length > 0 && (
            <span className={`message ${isId ? "success" : "error"}`}>
              {idMessage}
            </span>
          )}
        </div>
        <input
          id="id"
          onChange={idHandler}
          value={id}
          name="nickname"
          type="text"
        />
      </InputBox>

      <InputBox>
        <div>
          <label htmlFor="password">비밀번호</label>
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
        </div>
        <input
          id="password"
          onChange={passwordHandler}
          value={password}
          name="password"
          type="text"
          style={{ marginBottom: "50px" }}
        />
      </InputBox>

      <Button btnSize={"large"}>로그인</Button>
    </Form>
  );
};

export default Signin;

const Form = styled.form`
  border: 1px solid rgba(244, 210, 85, 1);
  background-color: rgba(255, 252, 241, 1);
  width: 30%;
  min-width: 500px;
  height: 600px;
  min-height: 600px;
  margin: auto;
  margin-top: 5rem;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  margin: 20px;
  span {
    font-size: 8px;
  }
  div {
    display: flex;
  }
  input {
    border-radius: 10px;
    height: 40px;
    border: none;
    border-bottom: 1px solid rgba(244, 220, 131, 1);
    &:focus {
      outline-color: rgba(244, 210, 85, 1);
    }
  }
  label {
    width: 110px;
    font-weight: bold;
  }
  .message {
    &.success {
      color: #47c83e;
    }
    &.error {
      color: #ff2727;
    }
  }
`;
