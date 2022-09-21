import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogue, setModal } from '../shared/redux/modules/modalSlice';
import MatchCard from '../components/sportsPage/MatchCard';
import ReuseTemperature from '../components/reusable/ReuseTemperature';
import { loadMatchThunk } from '../shared/redux/modules/matchSlice';
import { getLocal } from '../shared/axios/local';

// tmp
import { dummySports } from '../dummyData/dummyIndex';

const SportsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const matchList = useSelector((state) => state.match.matches);
  const regionAndSports = getLocal('regionAndSports');
  const sports = regionAndSports.sports;
  const sportsEn = regionAndSports.sportsEn;
  const regionId = regionAndSports.regionId;
  const region = regionAndSports.region;
  const matchsports = dummySports.filter((each) => each.sports === sports)[0];

  //match 받아오기
  useEffect(() => {
    console.log('get matches!!!');
    const additionalUrl = `/${regionId}/${sportsEn}`;
    dispatch(loadMatchThunk(additionalUrl));
  },[])

  const doMatchWrite = () => {
    if(userData.username){
      console.log('write!!');
      dispatch(setModal({modalType: 'matchWrite'}))
    }else{
      dispatch(setDialogue({dialType: 'confirmLogin'}))
    }
  }
  const filtering = () => {
    console.log('나중에 구현할 필터링')
  }
  useEffect(() => {
    console.log(matchList);
  },[matchList])
  return(
    <MainPage>
      <SportsAndRank>
        <SportsImg src={matchsports.sportsImage} alt={sports} />
        {/* <RankArticle>
          <ReuseTemperature type={'rank'} type2={'score'} userProfile={you} username={'영 동'} data={85}/>
          <ReuseTemperature type={'rank'} type2={'count'} userProfile={you} username={'성 원'} data={10}/>
          <ReuseTemperature type={'rank'} type2={'temper'} userProfile={you} username={'동 윤'} data={69}/>
        </RankArticle> */}
      </SportsAndRank>

      <MatchContainer>
        <MatchContainerHeader>
          <MatchContainerHeaderTitle>{region}, {sports} 한 판?</MatchContainerHeaderTitle>
          <MatchContainerHeaderUsers>profile 컨테이너</MatchContainerHeaderUsers>
        </MatchContainerHeader>
        <CircleBtns>
          <CircleBtn onClick={filtering}>
            <CircleBtnContent>필</CircleBtnContent>
          </CircleBtn>
          <CircleBtn onClick={doMatchWrite}>
            <CircleBtnContent>+</CircleBtnContent>
          </CircleBtn>
        </CircleBtns>
        <MatchContainerBody>
          {matchList? matchList.map((each) => 
            <MatchCard key={each.match_id} data={each} />
          ):<></>}
        </MatchContainerBody>
      </MatchContainer>
    </MainPage>
  )
};

export default SportsPage;

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
  justify-content: center;
  // justify-content: space-between;
  width: 700px;
  margin-bottom: 20px;
`
const SportsImg = styled.img`
  width: 200px;
  height: auto;
  border-radius: 2rem 1rem 1rem 0rem;
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
const CircleBtns = styled.div`
  position: absolute;
  right: -60px;
  top: 70px;
`
const CircleBtn = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 2rem;
  background-color: ${({theme}) => theme.colors.skyblue};
`
const CircleBtnContent = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
