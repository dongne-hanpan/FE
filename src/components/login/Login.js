import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../shared/redux/modules/userSlice';
import { clearModal, setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseInput from '../reusable/ReuseInput';
//temp
import logo from '../../asset/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const authError = useSelector((state) => state.user.error);

  //doLogin 결과에 따른 에러 핸들링
  useEffect(() => {
    if(userData.username){
      dispatch(clearModal());
    }
    if(authError.errorType === 'loginUserThunk'){
      if(authError.statusCode === 500 || authError.statusCode === 401){
        dispatch(setDialogue({dialType: 'failLogin'}));
      }
    }
  },[userData, authError, dispatch])

  const moveToSignup = () => {
    dispatch(setModal({modalType: 'signup'}))
  }
  //로그인
  const loginUsernameRef = useRef(null);
  const loginPwRef = useRef(null);

  const doLogin = async(e) => {
    const usernameValue = loginUsernameRef.current.value;
    const pwValue = loginPwRef.current.value;

    const payload = {
      username: usernameValue,
      password: pwValue
    };
    dispatch(loginUserThunk(payload));
    
    loginUsernameRef.current.value = '';
    loginPwRef.current.value = '';
  }

  return(
    <RegisterComp>
      <LogoBox>
        <LoginLogo src={logo} alt="logo" />
      </LogoBox>
      <InputTitleBox>
        <InputTitle>아이디</InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={loginUsernameRef} injType={'text'} placeholderValue={'아이디를 입력해주세요'} />

      <InputTitleBox>
        <InputTitle>비밀번호</InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={loginPwRef} injType={'password'} placeholderValue={'비밀번호를 입력해주세요'} />
      <ErrorMsg></ErrorMsg>

      <SocialLogin>Google로 로그인</SocialLogin>
      <ReuseBtn styleType={'stretch'} content={'로그인'} clickEvent={doLogin} />
      <SwitchToSignup>아직 회원이 아니신가요? <SwitchToSignupLink onClick={moveToSignup}>회원가입 하기</SwitchToSignupLink></SwitchToSignup>
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
`
const LogoBox = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`
const LoginLogo = styled.img`
  width: 200px;
`
const InputTitleBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
const InputTitle = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const ErrorMsg = styled.div`
`
const SocialLogin = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  border: 2px solid ${({theme}) => theme.colors.gray};
  border-radius: 0.5rem;
  &:hover{
    border: 2px solid ${({theme}) => theme.colors.darkgray};
    transition: all 0.3s ease-in-out;
  }
`
const SwitchToSignup = styled.div`
  margin-top: 26px;
  font-size: ${({theme}) => theme.fontSize.font_14};
`
const SwitchToSignupLink = styled.span`
  color: ${({theme}) => theme.colors.core};
  cursor: pointer;
`