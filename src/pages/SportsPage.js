import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogue, setModal } from '../shared/redux/modules/modalSlice';
import { loadAllMatchThunk, loadMatchThunk } from '../shared/redux/modules/matchSlice';
import { clearAlermError, clearAlermStatus } from '../shared/redux/modules/alermSlice';
import { regionData, sportsData } from '../data/regionSportsData';
import { getLocal, setLocal } from '../shared/axios/local';
import MatchCard from '../components/sportsPage/MatchCard';


const SportsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const matchList = useSelector((state) => state.match.matches);
  const alermStatus = useSelector((state) => state.alerm.alermStatus);
  const alermError = useSelector((state) => state.alerm.error);
  const sportsLocal = getLocal('sports');
  const regionLocal = getLocal('region');
  const sportsEn = sportsLocal.sportsEn;
  const sports = sportsLocal.sports;
  const regionId = regionLocal.regionId;
  const region = regionLocal.region;
  const matchsports = sportsData.filter((each) => each.sports === sports)[0];
  
  // alerm 에러 핸들링
  useEffect(() => {
    if(alermStatus !== null){
      if(alermStatus === 'success'){
        dispatch(setDialogue({dialType: 'confirmApply'}))
      }
      dispatch(clearAlermStatus());
    }
    if(alermError.errorType !== undefined){
      if(alermError.errorType === 'contactHostThunk'){
        if(alermError.statusCode === 500){
          if(alermError.message === '이미 신청한 매치 입니다'){
            dispatch(setDialogue({dialType: 'denyContactAgain', matchId: alermError.match_id}));
          }else if(alermError.message === '참여 가능 인원이 초과되었습니다'){
            dispatch(setDialogue({dialType: 'denyContact'}));
          }
        } else if(alermError.statusCode === 404){
          dispatch(setDialogue({dialType: 'denyExist'}));
        }
      } else if(alermError.errorType === 'permitAlermThunk'){
        if(alermError.statusCode === 500){
          dispatch(setDialogue({dialType: 'applyCanceled'}));
        } else if(alermError.statusCode === 404){
          dispatch(setDialogue({dialType: 'denyExist'}));
        }
      }
      dispatch(clearAlermError())
    }
  },[alermStatus, alermError])

  //매치 받아오기
  useEffect(() => {
    if(regionId !== '0'){
      const additionalUrl = `/${regionId}/${sportsEn}`;
      dispatch(loadMatchThunk(additionalUrl));
    } else{
      dispatch(loadAllMatchThunk(sportsEn));
    }
  },[regionId])
  
  //매치 작성하기
  const regionRef = useRef(null);
  const doMatchWrite = () => {
    if(userData.username){
      if(regionId === '0'){
        alert("'전체 지역'이 아닌 구체적인 지역을 선택해주세요")
        regionRef.current.focus();
      }else{
        dispatch(setModal({modalType: 'matchWrite'}))
      }
    }else{
      dispatch(setDialogue({dialType: 'confirmLogin'}))
    }
  }

  //지역 selectbox 핸들러
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
            <RegionOption disabled>지역을 선택하세요</RegionOption>
            {regionData.map((each) => 
              <RegionOption key={each.regionId} value={[each.regionId,each.region]}>{each.region}</RegionOption>
            )}
          </RegionDropbox>
        </MatchContainerHeader>
        <CircleBtns>
          <CircleBtn onClick={doMatchWrite}>
            <CircleBtnContent><i className="fa-solid fa-plus" /></CircleBtnContent>
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