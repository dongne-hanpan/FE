import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReuseProfile from '../components/reusable/ReuseProfile';
import ReuseTemperature from '../components/reusable/ReuseTemperature';
import ReuseBadge from '../components/reusable/ReuseBadge';
import MatchCard from '../components/sportsPage/MatchCard';
import { getLocal } from '../shared/axios/local';
import { logoutUserThunk } from '../shared/redux/modules/userSlice';
import { loadMyMatchThunk } from '../shared/redux/modules/matchSlice';
import { setDialogue, setModal } from '../shared/redux/modules/modalSlice';
import { getCookie } from '../shared/axios/cookie';


const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const authError = useSelector((state) => state.user.error);
  const myMatchList = useSelector((state) => state.match.matches);
  const myPageData = useSelector((state) => state.match.elseData);
  let sportsEn = null;

  //match 받아오기
  useEffect(() => {
    if(getLocal('sports') !== null){
      console.log('get my matches!!!');
      sportsEn = getLocal('sports').sportsEn;
      const additionalUrl = `/${sportsEn}`;
      dispatch(loadMyMatchThunk(additionalUrl));
    }
  },[]);

  useEffect(() => {
    if(authError.errorType === 'updateProfileThunk'){
      if(authError.statusCode === 500){
        dispatch(setDialogue({dialType: 'denyFileUpload'}));
      }
    }
    const cookie = getCookie('mytoken');
    if(!cookie && !userData.username){
      navigate('/')
    }
  },[userData,authError,navigate])


  const showChageProfileModal = () => {
    dispatch(setModal({modalType: 'changeProfile'}));
  }
  const goChatPage = () => {
    navigate('/chat');
  }
  const doLogout = () => {
    dispatch(logoutUserThunk());
  }
  
  return(
    <MainPage>
      <SportsAndRank>
        <ReuseProfile imgSrc={userData.profileImage} imgSize={'220'} />
        <UserBtns>
          <ReuseBadge direc={'verti'} bdgType={'rank'} content={myPageData.level} />
          <ReuseBadge direc={'verti'} bdgType={'btn'} content={'프로필 편집'} clickEvent={showChageProfileModal} />
          <ReuseBadge direc={'verti'} bdgType={'btn'} content={'채팅창 가기'} clickEvent={goChatPage} />
          <ReuseBadge direc={'verti'} bdgType={'btn'} content={'로그 아웃'} clickEvent={doLogout} />
        </UserBtns>
        <RankArticle>
          <ReuseTemperature type={'personal'} type2={'score'} data={myPageData.score} />
          <ReuseTemperature type={'personal'} type2={'count'} data={myPageData.matchCount} />
          <ReuseTemperature type={'personal'} type2={'temper'} data={myPageData.mannerPoint} />
        </RankArticle>
      </SportsAndRank>

      <MatchContainer>
        <MatchContainerHeader>
          <MatchContainerHeaderTitle>나의 매치</MatchContainerHeaderTitle>
          <MatchContainerHeaderUsers>profile 컨테이너</MatchContainerHeaderUsers>
        </MatchContainerHeader>
        <MatchContainerBody>
          {myMatchList? myMatchList.map((each) => 
            <MatchCard key={each.match_id} data={each} />
          ):<></>}
        </MatchContainerBody>
      </MatchContainer>
    </MainPage>
  )
};

export default MyPage;

const MainPage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const SportsAndRank = styled.section`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin-bottom: 20px;
`
const UserBtns = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const RankArticle = styled.article`
  display: flex;
`
const MatchContainer = styled.section`
  width: 700px;
  display: flex;
  flex-direction: column;
  position: relative;
`
const MatchContainerHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MatchContainerHeaderTitle = styled.h2`
  font-size: ${({theme}) => theme.fontSize.font_32};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const MatchContainerHeaderUsers = styled.div`
  display: flex;
`
const MatchContainerBody = styled.ul`
  padding: 0px;
`