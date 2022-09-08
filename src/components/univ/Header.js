import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../shared/redux_d/modules/modalSlice';
import ReuseProfile from '../y_reusable/ReuseProfile';
import HeaderAlerm from './HeaderAlerm';
import ReuseWeather from '../y_reusable/ReuseWeather';
import ReuseReserved from '../y_reusable/ReuseReserved';

//temp
import logo from '../../asset/logo.png';
import profile from '../../asset/profileMe.png';
import sun from '../../asset/sun.png';



const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    if(userData.id){
      dispatch(setModal({}));
    } else{
      dispatch(setModal({modalType: 'login'}))
    }
  },[userData]);
  
  return(
    <HeaderComp>
      <HeaderLogoSection>
        <img className="headerLogo" src={logo} alt="dongne_logo" />
      </HeaderLogoSection>

      <HeaderAlermSection>
          <HeaderAlerm checked={true}/>
      </HeaderAlermSection>

      <HeaderUserSection>
        <div className='userGreet'>
          <div> 동작구 </div>
          <div><span>영동</span> 님 안녕하세요</div>
          <ReuseProfile imgSrc={profile} />
        </div>
        <div className="userElse">
          <ReuseReserved matches={2} marginPx={2}/>
          <ReuseWeather imgSrc={sun} />
        </div>
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
  .headerLogo{
    height: 40px;
    margin: 0px 10px;
  }
`
const HeaderAlermSection = styled.article`
  min-width: 450px;
  height: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.black};
  cursor: pointer;
  ${HeaderComp}:hover &{
    height: 170px;
    transition: height 0.5s ease-in-out;
  }
`
const HeaderUserSection = styled.article`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  .userGreet{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    & div{
      margin-left: 10px;
      color: ${({theme}) => theme.colors.background};
      font-weight: ${({theme}) => theme.fontWeight.light};
      & span{
        font-weight: ${({theme}) => theme.fontWeight.medium};
      }
    }
  }
  .userElse{
    height: 0px;
    overflow-y: hidden;
  }
  ${HeaderComp}:hover & .userElse{
    height: 120px;
    transition: height 0.5s ease-in-out;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`
