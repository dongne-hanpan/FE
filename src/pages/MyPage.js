import React, { useEffect, useState } from 'react';
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
import ReuseBtn from '../components/reusable/ReuseBtn';


const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const authError = useSelector((state) => state.user.error);
  const myMatchList = useSelector((state) => state.match.matches);
  const myPageData = useSelector((state) => state.match.elseData);
  let sportsEn = null;
  const [sortedList, setSortedList] = useState(
    {
      recruitList:[],
      reservedList: [],
      doneList: []
    });
  useEffect(() => {
    const newSortedChatList = {
      recruitList:[],
      reservedList: [],
      doneList: []
    }
    myMatchList.map((each) => {
      if(each.matchStatus === 'recruit'){
        newSortedChatList.recruitList.push(each)
      } else if(each.matchStatus === 'reserved'){
        newSortedChatList.reservedList.push(each)
      } else{
        newSortedChatList.doneList.push(each)
      }
    })
    setSortedList(newSortedChatList);
  },[myMatchList])

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
  const [doneToggle, setDoneToggle] = useState(false);
  const showDoneToggle = () => {
    setDoneToggle(!doneToggle);
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
        </MatchContainerHeader>
        <MatchContainerBody>
          {sortedList.reservedList.map((each) => 
            <MatchCard key={each.match_id} data={each} />
          )}
          {sortedList.recruitList.map((each) => 
            <MatchCard key={each.match_id} data={each} />
          )}
        <ToggleBtn>
          <SmallBtn onClick={showDoneToggle}>{doneToggle ? '닫기' : '완료된 매치 보기'}</SmallBtn>
        </ToggleBtn>
          {doneToggle ? sortedList.doneList.map((each) => 
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 100px;
  overflow: scroll;
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
const MatchContainerBody = styled.ul`
  padding: 0px;
`
const ToggleBtn = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`
const SmallBtn = styled.span`
  padding: 10px 20px;
  color: ${({theme}) => theme.colors.gray};
  font-size: ${({theme}) => theme.fontSize.font_15};
  font-weight: ${({theme}) => theme.fontWeight.light};
  cursor: pointer;
`