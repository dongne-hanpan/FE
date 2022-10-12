import React from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../asset/kakao_logo.png'

//카카오 로그인
const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
const protocol = window.location.protocol;
const host = window.location.host;

const REDIRECT_URI = `${protocol}//${host}/user/kakao/callback`

const KAKAO_HOST = 'https://kauth.kakao.com';
const KAKAO_GET_AUTH_CODE = `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`


const KakaoLogin = () => {
  const doKakaoLogin = () => {
    window.location.href=`${KAKAO_HOST}${KAKAO_GET_AUTH_CODE}`
  }
  return(
    <SocialLogin onClick={doKakaoLogin}>
      <KakaoText><KakaoImg src={kakaoLogo} alt="kakao logo" loading='lazy'/>카카오 아이디로 로그인</KakaoText>
    </SocialLogin>
  )
}

export default React.memo(KakaoLogin)

const SocialLogin = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0px solid ${({theme}) => theme.colors.gray};
  border-radius: 0.5rem;
  background-color: #FEE500;
  color: #181600;
  &:hover{
    border: 1.5px solid ${({theme}) => theme.colors.darkgray};
    transition: all 0.2s ease-in-out;
  }
`
const KakaoText = styled.span`
  position: relative;
`
const KakaoImg = styled.img`
  position: absolute;
  left: -95px;
  width: 18px;
`