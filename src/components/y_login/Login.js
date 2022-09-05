import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setModal } from '../../shared/redux_d/modules/modalSlice';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseInput from '../y_reusable/ReuseInput';
//temp
import logo from '../../asset/logo.png';
import { loginUser } from '../../shared/redux_d/modules/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const moveToSignup = () => {
    dispatch(setModal({modalType: 'signup'}))
  }
  //로그인
  const loginIdRef = useRef(null);
  const loginPwRef = useRef(null);

  const doLogin = (e) => {
    const idValue = loginIdRef.current.value;
    const pwValue = loginPwRef.current.value;

    const payload = {
      id: idValue,
      pw: pwValue
    };
    dispatch(loginUser(payload));

    loginIdRef.current.value = '';
    loginPwRef.current.value = '';
  }

  return(
    <RegisterComp>
      <LogoBox>
        <img className="loginLogo" src={logo} alt="logo" />
      </LogoBox>
      <InputTitleBox>
        <InputTitle>아이디</InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={loginIdRef} injType={'text'} placeholderValue={'아이디를 입력해주세요'} />

      <InputTitleBox>
        <InputTitle>비밀번호<span>error_message</span></InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={loginPwRef} injType={'password'} placeholderValue={'비밀번호를 입력해주세요'} />
      <div className="errorMsg"></div>

      <button className="socialLogin">Google로 로그인</button>
      <ReuseBtn styleType={'stretch'} content={'회원가입'} clickEvent={doLogin} />
      <div className="switchToSignup">아직 회원이 아니신가요? <span onClick={moveToSignup}>회원가입 하기</span></div>
    </RegisterComp>
  )
};

export default Login;

const RegisterComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .errorMsg{
    margin: 16px 0px;
  }
  .socialLogin{
    width: 100%;
    height: 40px;
    border: 2px solid var(--color-gray);
    border-radius: 0.5rem;
    margin-bottom: 10px;
  }
  .socialLogin:hover{
    border: 2px solid var(--color-darkgray);
    transition: all 0.3s ease-in-out;
  }
  .switchToSignup{
    margin-top: 26px;
    font-size: var(--font-14);
    & span{
      color: var(--color-core);
    }
  }
`
const LogoBox = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  .loginLogo{
    width: 200px;
  }
`
const InputTitleBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
const InputTitle = styled.div`
  font-size: var(--font-18);
  font-weight: 500;
  & span{
    display: none;
  }
`