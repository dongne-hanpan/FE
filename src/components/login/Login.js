import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../shared/redux/modules/userSlice';
import { clearModal } from '../../shared/redux/modules/modalSlice';
import ReuseTitleBox from '../reusable/ReuseTitleBox';
import ReuseInput from '../reusable/ReuseInput';
import KakaoLogin from './kakaoLogin';
import ReuseBtn from '../reusable/ReuseBtn';
import SwitchLoginSignup from './SwitchLoginSignup';
import logo from '../../asset/logo.png';


const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  //유저 정보가 있다면 창 닫기
  useEffect(() => {
    if(userData.username){
      dispatch(clearModal());
    }
  },[userData, dispatch])

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
        <LoginLogo src={logo} alt="logo" loading='lazy'/>
      </LogoBox>
      <ReuseTitleBox withBtn={false} titleContent={'아이디'} />
      <ReuseInput injRef={loginUsernameRef} injType={'text'} placeholderValue={'아이디를 입력해주세요'} />

      <ReuseTitleBox withBtn={false} titleContent={'비밀번호'} />
      <ReuseInput injRef={loginPwRef} injType={'password'} placeholderValue={'비밀번호를 입력해주세요'} />

      <KakaoLogin />
      <ReuseBtn styleType={'stretch'} content={'로그인'} clickEvent={doLogin} />
      <SwitchLoginSignup presentComp={'login'} />
    </RegisterComp>
  )
};

export default Login;

const RegisterComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
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