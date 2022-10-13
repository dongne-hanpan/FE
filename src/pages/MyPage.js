import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyMatchThunk } from '../shared/redux/modules/matchSlice';
import { getLocal } from '../shared/axios/local';
import MatchCard from '../components/sportsPage/MatchCard';
import MyPageHead from '../components/myPage/MyPageHead';


const MyPage = () => {
  const dispatch = useDispatch();
  const myMatchList = useSelector((state) => state.match.matches);
  let sportsEn = null;

  // 받아온 MyMatchList 종류별로 정리
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
      } else if(each.matchStatus === 'done'){
        newSortedChatList.doneList.push(each)
      }
    })
    setSortedList(newSortedChatList);
  },[myMatchList])

  //match 받아오기
  useEffect(() => {
    if(getLocal('sports') !== null){
      sportsEn = getLocal('sports').sportsEn;
      const additionalUrl = `/${sportsEn}`;
      dispatch(loadMyMatchThunk(additionalUrl));
    }
  },[]);

  //완료된 매치 보기
  const [doneToggle, setDoneToggle] = useState(false);
  const showDoneToggle = () => {
    setDoneToggle(!doneToggle);
  }
  
  return(
    <MainPage>
      <MyPageHead />

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