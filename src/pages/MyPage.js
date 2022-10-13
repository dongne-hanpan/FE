import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyMatchThunk } from '../shared/redux/modules/matchSlice';
import { getLocal } from '../shared/axios/local';
import MyPageHead from '../components/myPage/MyPageHead';
import MyLiveList from '../components/myPage/MyLiveList';
import MyDoneList from '../components/myPage/MyDoneList';


const MyPage = () => {
  const dispatch = useDispatch();
  const myMatchList = useSelector((state) => state.match.matches);
  let sportsEn = null;

  //match 받아오기
  useEffect(() => {
    if(getLocal('sports') !== null){
      sportsEn = getLocal('sports').sportsEn;
      const additionalUrl = `/${sportsEn}`;
      dispatch(loadMyMatchThunk(additionalUrl));
    }
  },[]);
  
  return(
    <MainPage>
      <MyPageHead />

      <MatchContainer>
        <MatchContainerHeader>
          <MatchContainerHeaderTitle>나의 매치</MatchContainerHeaderTitle>
        </MatchContainerHeader>
        <MatchContainerBody>
          <MyLiveList reservedList={myMatchList.reservedList} recruitList={myMatchList.recruitList} />
          <MyDoneList doneList={myMatchList.doneList} />
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