import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { signupUserThunk } from '../../shared/redux/modules/userSlice';
import { setDialogue } from '../../shared/redux/modules/modalSlice';
import { getwithoutCookie } from '../../shared/axios/axios';
import { isValidUsername, isValidNickname, isValidPw } from '../../shared/function/validater';
import ReuseTitleBox from '../reusable/ReuseTitleBox';
import ReuseInput from '../reusable/ReuseInput';
import ReuseBtn from '../reusable/ReuseBtn';
import SwitchLoginSignup from './SwitchLoginSignup';


const Signup = () => {
  const dispatch = useDispatch();

  //회원가입
  const signupUsernameRef = useRef(null);
  const signupNicknameRef = useRef(null);
  const signupPwRef = useRef(null);
  const signupPwConfirmRef = useRef(null);

  const doSignup = () => {
    const usernameValue = signupUsernameRef.current.value;
    const nicknameValue = signupNicknameRef.current.value;
    const pwValue = signupPwRef.current.value;
    const pwConfirmValue = signupPwConfirmRef.current.value;
    //아이디, 닉네임 중복체크 여부 확인
    if(usernameErr !== 'success'){
      usernameMsg.current.innerText = '중복체크를 눌러주세요';
      setUsernameErr('danger')
      return
    }
    if(nicknameErr !== 'success'){
      nicknameMsg.current.innerText = '중복체크를 눌러주세요';
      setNicknameErr('danger')
      return
    }
    //중복체크 통과 했는데 바뀌었을 경우: username
    if(usernameValue !== validUsername){
      usernameMsg.current.innerText = '중복체크에 통과한 값과 다릅니다';
      setUsernameErr('danger')
      return
    }
    //중복체크 통과 했는데 바뀌었을 경우: nickname
    if(nicknameValue !== validNickname){
      nicknameMsg.current.innerText = '중복체크에 통과한 값과 다릅니다';
      setNicknameErr('danger')
      return
    }
    //비밀번호 유효성 확인
    if(!isValidPw(pwValue)){
      pwMsg.current.innerText = '비밀번호 형식을 확인해주세요'
      setPwErr('danger')
      return
    } else{
      pwMsg.current.innerText = '사용 가능한 비밀번호입니다'
      setPwErr('success')
    }
    //비밀번호 일치 확인
    if(pwValue !== pwConfirmValue){
      pwConfirmMsg.current.innerText = '비밀번호가 일치하지 않습니다'
      setPwConfirmErr('danger');
      return
    } else{
      pwConfirmMsg.current.innerText = ''
      setPwConfirmErr('success')
    }
    const signupPayload = {
      "nickname": nicknameValue,
      "password": pwValue,
      "username": usernameValue,
    };
    dispatch(signupUserThunk(signupPayload));

    //인풋 값 정리
    signupUsernameRef.current.value = '';
    signupNicknameRef.current.value = '';
    signupPwRef.current.value = '';
    signupPwConfirmRef.current.value = '';
    //에러메시지 정리
    usernameMsg.current.innerText = '';
    nicknameMsg.current.innerText = '';
    pwMsg.current.innerText = '';
    pwConfirmMsg.current.innerText = '';
    setUsernameErr(null);
    setNicknameErr(null);
    setPwErr(null);
    setPwConfirmErr(null);
    dispatch(setDialogue({dialType: 'confirmSignup'}))
  };

  //유효성 체크
  const usernameMsg = useRef(null);
  const nicknameMsg = useRef(null);
  const pwMsg = useRef(null);
  const pwConfirmMsg = useRef(null);

  const [usernameErr, setUsernameErr] = useState('none');
  const [nicknameErr, setNicknameErr] = useState('none');
  const [pwErr, setPwErr] = useState('none');
  const [pwConfirmErr, setPwConfirmErr] = useState('none');

  const [validUsername, setValidUsername] = useState(null);
  const [validNickname, setValidNickname] = useState(null);

  //아이디 중복체크
  const checkDupUsername = useCallback(async(e) => {
    const username = signupUsernameRef.current.value;
    const afterCheck = isValidUsername(username);
    if(!afterCheck){
      usernameMsg.current.innerText = '아이디 형식을 다시 확인해주세요';
      setUsernameErr('danger');
    }else{
      const res = await getwithoutCookie(`/api/auth/username/${username}`);
      if(res){
        usernameMsg.current.innerText = '사용 가능한 아이디입니다';
        setUsernameErr('success');
        setValidUsername(username);
        
      } else {
        usernameMsg.current.innerText = '사용 중인 아이디입니다';
        setUsernameErr('danger')
      }
    }
  },[])

  //유저이름 중복체크
  const checkDupNickname = useCallback(async(e) => {
    const nickname = signupNicknameRef.current.value;
    const afterCheck = isValidNickname(nickname);
    if(!afterCheck){
      nicknameMsg.current.innerText = '닉네임 형식을 다시 확인해주세요';
      setNicknameErr('danger');
    }else{
      const res = await getwithoutCookie(`/api/auth/nickname/${nickname}`);
      if(res){
        nicknameMsg.current.innerText = '사용 가능한 닉네임입니다';
        setNicknameErr('success');
        setValidNickname(nickname);
      }else{
        nicknameMsg.current.innerText = '사용 중인 닉네임입니다';
        setNicknameErr('danger');
      }
    }
  },[]);

  return(
    <RegisterComp>
      <SignupSection>
        <ReuseTitleBox withBtn={true} btnClickEvent={checkDupUsername} titleContent={'아이디'} titleRef={usernameMsg} titleStatus={usernameErr} />
        <ReuseInput injRef={signupUsernameRef} injType={'text'} placeholderValue={'아이디 (6-12자 이내, 영문, 숫자 사용 가능)'} />

        <ReuseTitleBox withBtn={true} btnClickEvent={checkDupNickname} titleContent={'닉네임'} titleRef={nicknameMsg} titleStatus={nicknameErr} />
        <ReuseInput injRef={signupNicknameRef} injType={'text'} placeholderValue={'닉네임(2-12자 이내, 영문,숫자 사용 가능)'} />

        <ReuseTitleBox withBtn={false} titleContent={'비밀번호'} titleRef={pwMsg} titleStatus={pwErr} />
        <ReuseInput injRef={signupPwRef} injType={'password'} placeholderValue={'비밀번호 (8자 이상, 문자/숫자/기호 사용 가능)'} />

        <ReuseTitleBox withBtn={false} titleContent={'비밀번호 확인'} titleRef={pwConfirmMsg} titleStatus={pwConfirmErr} />
        <ReuseInput injRef={signupPwConfirmRef} injType={'password'} placeholderValue={'비밀번호를 다시 한번 입력해주세요'} />
      </SignupSection>
      <ReuseBtn styleType={'stretch'} content={'회원가입'} clickEvent={doSignup}/>
      <SwitchLoginSignup presentComp={'signup'} />
    </RegisterComp>
  )
};

export default Signup;


const RegisterComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SignupSection = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
`
