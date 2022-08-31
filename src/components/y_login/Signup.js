import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseInput from '../y_reusable/ReuseInput';



const Signup = () => {
  return(
    <RegisterComp>
      <div className="signupSection">
        <InputTitleBox>
          <InputTitle>아이디<span>error_message</span></InputTitle>
          <ReuseBtn content={'중복체크'} />
        </InputTitleBox>
        <ReuseInput inputType={'email'} placeholderValue={'example@gmail.com'} />

        <InputTitleBox>
          <InputTitle>닉네임<span>error_message</span></InputTitle>
          <ReuseBtn content={'중복체크'} />
        </InputTitleBox>
        <ReuseInput inputType={'text'} placeholderValue={'직박구리'} />

        <InputTitleBox>
          <InputTitle>비밀번호<span>error_message</span></InputTitle>
        </InputTitleBox>
        <ReuseInput inputType={'password'} placeholderValue={'비밀번호'} />

        <InputTitleBox>
          <InputTitle>비밀번호 확인<span>error_message</span></InputTitle>
        </InputTitleBox>
        <ReuseInput inputType={'password'} placeholderValue={'비밀번호 확인'} />
      </div>
      <ReuseBtn styleType={'stretch'} content={'회원가입'} />
      <div className="switchToLogin">이미 회원이신가요? <span>로그인하기</span></div>
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
  & span{
    display: none;
  }
`