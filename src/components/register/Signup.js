import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Signup = () => {
  //닉네임, 아이디, 비밀번호, 비밀번호확인
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswrodCheck] = useState("");

  //오류메세지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [nickMessage, setNickMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  //유효성 검사
  const [isId, setIsId] = useState(false);
  const [isNick, setIsNick] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  /**유효성 검사 */
  /** 닉네임 검사 */
  const nicknameHandler = useCallback((e) => {
    setNickname(e.target.value);
    if (e.target.value.length < 3) {
      setNickMessage("3글자 이상으로 입력해주세요 :)");
      setIsNick(false);
    } else if (e.target.value.length > 10) {
      setNickMessage("10글자 미만으로 입력해주세요 :)");
      setIsNick(false);
    } else {
      setNickMessage("사용가능");
      setIsNick(true);
    }
  }, []);

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

  /** 2차비밀번호 검사 */
  const passwrodCheckHandler = useCallback(
    (e) => {
      const passwordCheckCurrent = e.target.value;
      setPasswrodCheck(passwordCheckCurrent);
      if (password === passwordCheckCurrent) {
        setPasswordCheckMessage("비밀번호가 일치합니다 :)");
        setIsPasswordCheck(true);
      } else {
        setPasswordCheckMessage("비밀번호가 일치하지 않습니다 :)");
        setIsPasswordCheck(false);
      }
    },
    [password]
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isNick && isId && isPassword && isPasswordCheck) {
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
        <input id="id" onChange={idHandler} value={id} name="id" type="text" />
      </InputBox>
      <InputBox>
        <div>
          <label htmlFor="nickname">닉네임</label>
          {nickname.length > 0 && (
            <span className={`message ${isNick ? "success" : "error"}`}>
              {nickMessage}
            </span>
          )}
        </div>
        <input
          id="nickname"
          onChange={nicknameHandler}
          value={nickname}
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
        />
      </InputBox>
      <InputBox>
        <div>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          {passwordCheck.length > 0 && (
            <span
              className={`message ${isPasswordCheck ? "success" : "error"}`}
            >
              {passwordCheckMessage}
            </span>
          )}
        </div>
        <input
          id="passwordCheck"
          onChange={passwrodCheckHandler}
          value={passwordCheck}
          name="passwordCheck"
          type="text"
          style={{ marginBottom: "50px" }}
        />
      </InputBox>
      <Button btnSize={"large"}>회원가입</Button>
    </Form>
  );
};

export default Signup;

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
