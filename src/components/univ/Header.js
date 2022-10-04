import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserStatus, logoutUserThunk, refreshUserThunk, reissueThunk } from '../../shared/redux/modules/userSlice';
import { clearAlerm, clearAlermError, clearAlermStatus, getAlermThunk } from '../../shared/redux/modules/alermSlice';
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import { getCookie } from '../../shared/axios/cookie';
import { setLocal } from '../../shared/axios/local';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseWeather from '../reusable/ReuseWeather';
import ReuseBadge from '../reusable/ReuseBadge';
import MyReservedCnt from './MyReservedCnt';
import Sse from './Sse';
import logo from '../../asset/logo.png';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const userError = useSelector((state) => state.user.error);
  const userStatus = useSelector((state) => state.user.userStatus);
  const alermStatus = useSelector((state) => state.alerm.alermStatus);
  const alermError = useSelector((state) => state.alerm.error);
  const cookie = getCookie('mytoken');

  // 나의 위치 값 받아오기
  const successCallback = (pos) => {
    const crd = pos.coords;
    const myLatLng = {
      lat: crd.latitude,
      lng: crd.longitude
    }
    setLocal('myLatLng', myLatLng)
  }
  const errorCallback = (e) => {
    console.error(e);
  }
  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }
  useEffect(() => {
    getMyLocation();
  },[])

  //refresh 에러 핸들링
  useEffect(() => {
    if(userData.username === undefined && cookie){
      dispatch(refreshUserThunk());
    }
    if(userStatus === 'logoutUserThunk'){
      dispatch(clearAlerm());
      dispatch(clearUserStatus());
    }
    if(alermStatus === 'permitAlermThunk'){
      dispatch(getAlermThunk());
      dispatch(clearAlermStatus());
    }
  },[userData, userStatus, alermStatus, dispatch])

  //refresh 에러 핸들링
  useEffect(() => {
    if(userError.statusCode === 401 || alermError.statusCode === '401'){
      dispatch(reissueThunk());
      dispatch(clearAlermError());
    }
    if(userError.errorType === 'refreshUserThunk'){
      if(userError.statusCode === 500 || userError.statusCode === 401){
        dispatch(setDialogue({dialType: 'expireLogin'}))
      }
    }
  },[userError, alermError, dispatch])

  // 네비게이터 함수 모음
  const goIndexPage = () => {
    navigate('/');
  }
  const goMyPage = () => {
    if(userData.username){
      navigate('/mypage');
    } else{
      dispatch(setModal({modalType: 'login'}))
    }
  }
  const goChatPage = () => {
    navigate('/chat');
  }
  const doLogout = () => {
    dispatch(logoutUserThunk());
  }

  return(
    <HeaderComp>
      <HeaderLogoSection>
        <HeaderLogo src={logo} alt="dongne_logo" onClick={goIndexPage} />
      </HeaderLogoSection>

      <HeaderAlermSection>
        <Sse />
      </HeaderAlermSection>

      <HeaderUserSection>
        <UserGreet>
          <UserGreetNormal onClick={goMyPage}>
            {userData.nickname ? 
            <><UserName>{userData.nickname}</UserName> 님 안녕하세요</>
            :'로그인 해주세요'
            }
          </UserGreetNormal>
          <ReuseProfile imgSize={30} imgSrc={userData.profileImage} clickEvent={goMyPage} />
        </UserGreet>
        <UserElse>
          {userData.username ? 
          <>
            <UserBtns>
              <ReuseBadge direc={'verti'} bdgType={'btn'} content={'마이 페이지'} clickEvent={goMyPage} />
              <ReuseBadge direc={'verti'} bdgType={'btn'} content={'채팅창 가기'} clickEvent={goChatPage} />
              <ReuseBadge direc={'verti'} bdgType={'btn'} content={'로그 아웃'} clickEvent={doLogout} />
            </UserBtns>
            <MyReservedCnt clickEvent={goChatPage}/> 
          </>
          : <></>
          }
          <ReuseWeather />
        </UserElse>
      </HeaderUserSection>
    </HeaderComp>
  )
};

export default Header;


const HeaderComp = styled.header`
  width: 100vw;
  min-width: 800px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${({theme}) => theme.colors.core};
  border-radius: 0 0 1rem 1rem;
  transition: height 0.3s ease-in-out;
  &:hover{
    height: 200px;
    transition: height 0.5s ease-in-out;
  }
`
const HeaderLogoSection = styled.article`
  flex-grow: 4;
  `
  const HeaderLogo = styled.img`
  height: 40px;
  margin: 0px 10px;
  cursor: pointer;
`
const HeaderAlermSection = styled.article`
  flex-grow: 6;
  max-width: 500px;
  min-width: 340px;
  height: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.black};
  overflow-y: hidden;
  transition: height 0.3s ease-in-out;
  ${HeaderComp}:hover &{
    height: 170px;
    overflow-y: scroll;
    transition: height 0.5s ease-in-out;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
const HeaderUserSection = styled.article`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
`
const UserGreet = styled.div`
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 4px;
  margin-bottom: 10px;
`
const UserGreetNormal = styled.div`
  margin-right: 10px;
  color: ${({theme}) => theme.colors.background};
  font-weight: ${({theme}) => theme.fontWeight.light};
  cursor: pointer;
`
const UserName = styled.span`
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const UserElse = styled.div`
  height: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow-y: hidden;
  transition: height 0.2s ease-in-out;
  ${HeaderComp}:hover &{
    height: 120px;
    transition: height 0.5s ease-in-out;
  }
`
const UserBtns = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`