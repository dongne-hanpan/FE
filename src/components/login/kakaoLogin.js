  //카카오 로그인
  const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  const protocol = window.location.protocol;
  const host = window.location.host;

  const REDIRECT_URI = `${protocol}//${host}/user/kakao/callback`

  const KAKAO_HOST = 'https://kauth.kakao.com';
  const KAKAO_GET_AUTH_CODE = `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  
  export const doKakaoLogin = () => {
    window.location.href=`${KAKAO_HOST}${KAKAO_GET_AUTH_CODE}`
  }