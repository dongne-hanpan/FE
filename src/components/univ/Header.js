import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserThunk } from '../../shared/redux/modules/userSlice';
import { setModal } from '../../shared/redux/modules/modalSlice';
import ReuseProfile from '../reusable/ReuseProfile';
import HeaderAlerm from './HeaderAlerm';
import ReuseWeather from '../reusable/ReuseWeather';
import ReuseReserved from '../reusable/ReuseReserved';

//temp
import logo from '../../asset/logo.png';
import profile from '../../asset/defaultprofile.jpg';
import { getCookie } from '../../shared/axios/cookie';

// tmp
import dummyAlerm from '../../dummyData/dummyAlerm';

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  //새로고침 등으로 userData 값 사라지면, 
  useEffect(() => {
    const cookie = getCookie('mytoken');
    if(userData.username === undefined && cookie){
      dispatch(refreshUserThunk());
    }else{
      console.log(userData);
    }
  },[userData])


  const goMyPage = () => {
    if(userData.username){
      navigate('/mypage');
    } else{
      dispatch(setModal({modalType: 'login'}))
    }
  }
  return(
    <HeaderComp>
      <HeaderLogoSection>
        <HeaderLogo src={logo} alt="dongne_logo" />
      </HeaderLogoSection>

      <HeaderAlermSection>
        { userData.username ? 
        dummyAlerm.map((each) => 
          <HeaderAlerm key={each.id} alermType={each.type} checked={each.checked} content={each.msg} />
        ): <HeaderAlerm alermType={'checked'} checked={false} content={''} />
        }
      </HeaderAlermSection>

      <HeaderUserSection>
        <UserGreet>
          <UserGreetNormal> {userData.region ? userData.region:''} </UserGreetNormal>
          <UserGreetNormal>
            {userData.nickname ? 
            <><UserName>{userData.nickname}</UserName> 님 안녕하세요</>
            :'로그인 해주세요'
            }
          </UserGreetNormal>
          <ReuseProfile imgSize={30} imgSrc={userData.profileImage ? userData.profileImage : profile} clickEvent={goMyPage} />
        </UserGreet>
        <UserElse>
          {userData.username ? 
          <ReuseReserved matches={2} marginPx={2}/> : <></>
          }
          <ReuseWeather />
        </UserElse>
      </HeaderUserSection>
    </HeaderComp>
  )
};

export default Header;


const HeaderComp = styled.header`
  // width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${({theme}) => theme.colors.core};
  border-radius: 0 0 1rem 1rem;
  &:hover{
    height: 200px;
    transition: height 0.5s ease-in-out;
  }
`
const HeaderLogoSection = styled.article`
  flex-grow: 3;
  cursor: pointer;
`
const HeaderLogo = styled.img`
  height: 40px;
  margin: 0px 10px;
`
const HeaderAlermSection = styled.article`
  min-width: 450px;
  height: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.black};
  overflow-y: hidden;
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
`
const UserName = styled.span`
  font-weight: ${({theme}) => theme.fontWeight.medium};
`

const UserElse = styled.div`
  height: 0px;
  overflow-y: hidden;
  ${HeaderComp}:hover &{
    height: 120px;
    transition: height 0.5s ease-in-out;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`