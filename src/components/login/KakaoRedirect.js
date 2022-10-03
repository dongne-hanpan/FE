import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loginKakaoThunk } from '../../shared/redux/modules/userSlice';
import Loading from '../univ/Loading';


const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {search} = useLocation();
  const kakaoCode = search.split('?code=')[1];
  const userData = useSelector((state) => state.user.userData);

  const sendToBack = async() => {
    dispatch(loginKakaoThunk(kakaoCode));
  }
  useEffect(() => {
    if(userData.nickname !== undefined){
      navigate('/')
    }
  },[userData,navigate])

  useEffect(() => {
    if(kakaoCode!== null){
      sendToBack()
    }
  }, [kakaoCode]);
  return (
    <MainPage>
      <Loading size={40} />
    </MainPage>
  )
}
export default KakaoRedirect;

const MainPage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
