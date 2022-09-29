import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk, refreshUserThunk } from '../../shared/redux/modules/userSlice';
// import { getAlermThunk } from '../../shared/redux/modules/alermSlice';
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import { getCookie } from '../../shared/axios/cookie';
import ReuseProfile from '../reusable/ReuseProfile';
import HeaderAlerm from './HeaderAlerm';
import ReuseWeather from '../reusable/ReuseWeather';
import ReuseReserved from '../reusable/ReuseReserved';
import ReuseBadge from '../reusable/ReuseBadge';
import { setLocal } from '../../shared/axios/local';

//temp
import logo from '../../asset/logo.png';
import Sse from './Sse';


const Header = () => {
  console.log('here??')
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const authError = useSelector((state) => state.user.error);
  const alermData = useSelector((state) => state.alerm.alermData);
  const navigate = useNavigate();
  const [testAlerm, setTestAlerm] = useState([]);
  const successCallback = (pos) => {
    const crd = pos.coords;
    const myLatLng = {
      lat: crd.latitude,
      lng: crd.longitude
    }
    setLocal('myLatLng', myLatLng)
  }
  const errorCallback = () => {
    console.log('fail get my Location data')
  }

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }
  useEffect(() => {
    getMyLocation();
  },[])

  //SSE
  // useEffect(() => {
  //   const BASE_URL = "http://3.34.142.119";
  //   const subscribeUrl = `${BASE_URL}/sub/${userData.userId}`;
  //   if(userData.username !== undefined){
  //     const eventSource = new EventSource(subscribeUrl, {
  //       withCredentials: true,
  //     });
  //     eventSource.onopen = function(e){
  //       console.log('SSE open success');
  //       console.log('status from open',eventSource.readyState)
  //     }
  //     eventSource.onmessage = function(e) {
  //       console.log(e);
  //       console.log(JSON.parse(e.data));
  //       console.log('status from msg',eventSource.readyState)
  //     }
  //     eventSource.onerror = function (e) {
  //       console.log(JSON.parse(e.data))
  //       console.log('status from error',eventSource.readyState)
  //       eventSource.close();
  //     }
  //     eventSource.addEventListener("connect", function (e) {
  //       const myAlerms = JSON.parse(e.data);
  //       console.log('compare myAlerms and testAlerm', myAlerms,testAlerm)
  //       if(myAlerms !== testAlerm){
  //         setTestAlerm(myAlerms);
  //       }
  //     })
  //     eventSource.addEventListener("request", function (e) {
  //       const newMyAlerms = JSON.parse(e.data);
  //       console.log(newMyAlerms)
  //       console.log(testAlerm);
  //       const neww = [...testAlerm, newMyAlerms];
  //       console.log(neww);
  //       setTestAlerm(neww);
  //     })
  //     return () => {
  //       eventSource.close();
  //     }
  //   }
  // },[userData])

  //refresh 에러 핸들링
  useEffect(() => {
    const cookie = getCookie('mytoken');
    if(userData.username === undefined && !cookie){
      setTestAlerm([]);
    }
    if(userData.username === undefined && cookie){
      dispatch(refreshUserThunk());
      // dispatch(getAlermThunk());
    }
    if(authError.errorType === 'refreshUserThunk'){
      if(authError.statusCode === 500 || authError.statusCode === 401){
        dispatch(setDialogue({dialType: 'expireLogin'}))
      }
    }
  },[userData, authError, dispatch])


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
        <Sse testAlerm={testAlerm} setTestAlerm={setTestAlerm} />
        {/* { testAlerm.length > 0 ? 
          testAlerm.map((each,params) => 
            <HeaderAlerm key={params} data={each} />
          ): <div>'로그인이 필요합니다'</div>
        } */}
        {/* { alermData.length > 0 ? 
          alermData.map((each,params) => 
            <HeaderAlerm key={params} data={each} />
          ): <div>'로그인이 필요합니다'</div>
        } */}
      </HeaderAlermSection>

      <HeaderUserSection>
        <UserGreet>
          <UserGreetNormal> {userData.region ? userData.region:''} </UserGreetNormal>
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
            <ReuseReserved matches={2} marginPx={2}/> 
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
  flex-grow: 3;
  `
  const HeaderLogo = styled.img`
  height: 40px;
  margin: 0px 10px;
  cursor: pointer;
`
const HeaderAlermSection = styled.article`
  min-width: 450px;
  height: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.black};
  overflow-y: hidden;
  transition: height 0.3s ease-in-out;
  cursor: pointer;
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