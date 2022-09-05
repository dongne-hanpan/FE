import React, { useRef, useState } from 'react';
import styled, {css} from 'styled-components';
import { useDispatch } from 'react-redux';
import { setModal } from '../../shared/redux_d/modules/modalSlice';
import { getwithoutCookie, postWithoutCookie } from '../../shared/axios_d/axios';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseInput from '../y_reusable/ReuseInput';


const Signup = () => {
  const dispatch = useDispatch();
  const moveToLogin = () => {
    dispatch(setModal({modalType: 'login'}))
  }

  //회원가입
  const signupIdRef = useRef(null);
  const signupUsernameRef = useRef(null);
  const signupPwRef = useRef(null);
  const signupPwConfirmRef = useRef(null);

  const doSignup = () => {
    const idValue = signupIdRef.current.value;
    const usernameValue = signupUsernameRef.current.value;
    const pwValue = signupPwRef.current.value;
    const pwConfirmValue = signupPwConfirmRef.current.value;
    //아이디, 닉네임 중복체크 여부 확인
    if(idErr !== 'success'){
      console.log('아이디 중복체크 눌러라')
      return
    }
    if( usernameErr !== 'success'){
      console.log('유저네임 중복체크 눌러라')
      return
    }
    //비밀번호 유효성 확인
    if(!isValidPw(pwValue)){
      signupPwRef.current.innerText = '비밀번호 형식을 확인해주세요'
      setPwErr('danger')
      return
    } else{
      signupPwRef.current.innerText = '사용 가능한 비밀번호입니다'
      setPwErr('success')
    }
    //비밀번호 일치 확인
    if(pwValue !== pwConfirmValue){
      signupPwConfirmRef.current.innerText = '비밀번호가 일치하지 않습니다'
      setPwConfirmErr('danger');
      return
    } else{
      signupPwConfirmRef.current.innerText = ''
      setPwConfirmErr('success')
    }
    const signupPayload = {
      "nickname": usernameValue,
      "password": pwValue,
      "username": idValue,
    }
    postWithoutCookie(`/api/auth/signup`, signupPayload);

    signupIdRef.current.value = '';
    signupUsernameRef.current.value = '';
    signupPwRef.current.value = '';
    signupPwConfirmRef.current.value = '';
    dispatch(setModal({modalType: 'login'}))
  };

  //유효성 체크
  const idMsg = useRef(null);
  const usernameMsg = useRef(null);
  const pwMsg = useRef(null);
  const pwConfirmMsg = useRef(null);

  const [idErr, setIdErr] = useState('none');
  const [usernameErr, setUsernameErr] = useState('none');
  const [pwErr, setPwErr] = useState('none');
  const [pwConfirmErr, setPwConfirmErr] = useState('none');

  const isValidId = (idValue) => {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{6,12}$/;
    return regExp.test(idValue);
  }
  const isValidPw = (pwValue) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(pwValue);
  }

  //아이디 중복체크
  const checkDupId = async(e) => {
    const id = signupIdRef.current.value;
    const afterCheck = isValidId(id);
    if(!afterCheck){
      idMsg.current.innerText = '아이디 형식을 다시 확인해주세요';
      setIdErr('danger')
    }else{
      const res = await getwithoutCookie(`/api/auth/${id}`);
      if(res){
        idMsg.current.innerText = '사용 가능한 아이디입니다';
        setIdErr('success')
      } else {
        idMsg.current.innerText = '사용 중인 아이디입니다';
        setIdErr('danger')
      }
    }
  };

  //유저이름 중복체크
  const checkDupUsername = async(e) => {
    const username = signupUsernameRef.current.value;
    const res = await getwithoutCookie(`/api/auth/${username}`);
    if(res){
      usernameMsg.current.innerText = '사용 가능한 닉네임';
      setUsernameErr('success');
    }else{
      usernameMsg.current.innerText = '사용 중인 닉네임';
      setUsernameErr('danger');
    }
  };

  return(
    <RegisterComp>
      <div className="signupSection">
        <InputTitleBox>
          <InputTitle>아이디<ErrMessage ref={idMsg} status={idErr}></ErrMessage></InputTitle>
          <ReuseBtn content={'중복체크'} clickEvent={checkDupId} />
        </InputTitleBox>
        <ReuseInput injRef={signupIdRef} injType={'text'} placeholderValue={'아이디 (6-12자 이내, 영문, 숫자 사용 가능)'} />

        <InputTitleBox>
          <InputTitle>닉네임<ErrMessage ref={usernameMsg} status={usernameErr}></ErrMessage></InputTitle>
          <ReuseBtn content={'중복체크'} clickEvent={checkDupUsername} />
        </InputTitleBox>
        <ReuseInput injRef={signupUsernameRef} injType={'text'} placeholderValue={'닉네임을 입력해주세요'} />

        <InputTitleBox>
          <InputTitle>비밀번호<ErrMessage ref={pwMsg} status={pwErr}></ErrMessage></InputTitle>
        </InputTitleBox>
        <ReuseInput injRef={signupPwRef} injType={'password'} placeholderValue={'비밀번호 (8자 이상, 문자/숫자/기호 사용 가능)'} />

        <InputTitleBox>
          <InputTitle>비밀번호 확인<ErrMessage ref={pwConfirmMsg} status={pwConfirmErr}></ErrMessage></InputTitle>
        </InputTitleBox>
        <ReuseInput injRef={signupPwConfirmRef} injType={'password'} placeholderValue={'비밀번호를 다시 한번 입력해주세요'} />
      </div>
      <ReuseBtn styleType={'stretch'} content={'회원가입'} clickEvent={doSignup}/>
      <div className="switchToLogin">이미 회원이신가요? <span onClick={moveToLogin}>로그인하기</span></div>
    </RegisterComp>
  )
};

export default Signup;


const RegisterComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .signupSection{
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .switchToLogin{
    margin-top: 26px;
    font-size: var(--font-14);
    & span{
      color: var(--color-core);
    }
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
`
const ErrMessage = styled.span`
  font-size: var(--font-12);
  margin-left: 10px;
  ${({status}) => {
    if(status === 'success'){
      return css`
      display: inline;
      color: var(--color-green);
      `
    } else if(status === 'danger'){
      return css`
      display: inline;
      color: var(--color-red-light);
      `
    } else if(status === 'none'){
      return css`
      display: none;
      `
    }
  }}
`