import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogue, setModal } from '../shared/redux/modules/modalSlice';
import MatchCard from '../components/sportsPage/MatchCard';
import { loadMatchThunk } from '../shared/redux/modules/matchSlice';
import { getLocal, setLocal } from '../shared/axios/local';

// tmp
import { dummyRegion, dummySports } from '../dummyData/dummyIndex';

const SportsPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const matchList = useSelector((state) => state.match.matches);
  const sportsLocal = getLocal('sports');
  const sports = sportsLocal.sports;
  const sportsEn = sportsLocal.sportsEn;
  const regionLocal = getLocal('region');
  const regionId = regionLocal.regionId;
  const region = regionLocal.region;
  const matchsports = dummySports.filter((each) => each.sports === sports)[0];
  const regionRef = useRef(null);

  //match 받아오기
  useEffect(() => {
    console.log('get matches!!!');
    const additionalUrl = `/${regionId}/${sportsEn}`;
    dispatch(loadMatchThunk(additionalUrl));
  },[regionId])

  const doMatchWrite = () => {
    if(userData.username){
      if(regionId === '0'){
        alert("'전체 지역'이 아닌 구체적인 지역을 선택해주세요")
        regionRef.current.focus();
      }else{
        console.log('write!!');
        dispatch(setModal({modalType: 'matchWrite'}))
      }
    }else{
      dispatch(setDialogue({dialType: 'confirmLogin'}))
    }
  }

  const navigate = useNavigate();
  const selectChangeHandler = (e) => {
    const regionArray = e.target.value.split(',');
    const selectRegionId = regionArray[0];
    const selectRegionValue = regionArray[1];
    const regionInLocal = {
      regionId: selectRegionId,
      region: selectRegionValue
    }
    setLocal('region',regionInLocal);
    navigate(`/${selectRegionValue === '전체 지역' ? 'all': selectRegionValue}/${sports}`)
  };

  return(
    <MainPage>
      <SportsAndRank>
        <SportsImg src={matchsports.sportsImage} alt={sports} />
      </SportsAndRank>

      <MatchContainer>
        <MatchContainerHeader>
          <MatchContainerHeaderTitle>{sports} 한 판? <MatchRegion>{region}</MatchRegion></MatchContainerHeaderTitle>
          <RegionDropbox ref={regionRef} onChange={selectChangeHandler}>
            <RegionOption>지역을 선택하세요</RegionOption>
            {dummyRegion.map((each) => 
              <RegionOption key={each.regionId} value={[each.regionId,each.region]}>{each.region}</RegionOption>
            )}
          </RegionDropbox>
        </MatchContainerHeader>
        <CircleBtns>
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
const shake = keyframes`
  0% { transform: translate(1px, 0px) rotate(0deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  50% { transform: translate(-1px, 0px) rotate(-1deg); }
  70% { transform: translate(3px, 0px) rotate(1deg); }
  100% { transform: translate(1px, 0px) rotate(0deg); }
`
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
  width: 700px;
  margin-bottom: 20px;
`
const SportsImg = styled.img`
  width: 200px;
  height: auto;
  border-radius: 2rem 1rem 1rem 0rem;
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
const MatchRegion = styled.span`
  color: ${({theme}) => theme.colors.darkgray};
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const RegionDropbox = styled.select`
  height: 40px;
  padding: 0px 10px;
  border: none;
  border-radius: 0.5rem;
  border: 2px solid ${({region, theme}) => region ? theme.colors.background : theme.colors.skyblue};
  color: ${({region, theme}) => region ? theme.colors.background : theme.colors.black};
  font-weight: ${({region, theme}) => region ? theme.fontWeight.bold : theme.fontWeight.medium};
  background-color: ${({region, theme}) => region ? theme.colors.core : theme.colors.background};
  &:focus{
    animation: ${shake} 0.1s;
    animation-iteration-count: 3;
  }
`
const RegionOption = styled.option`
  padding: 10px;
`
const MatchContainerBody = styled.ul`
  padding: 0px;
`
const CircleBtns = styled.div`
  position: absolute;
  right: -60px;
  top: 85px;
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