import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sportsData, sportsConverter } from '../data/regionSportsData';
import { setDialogue } from '../shared/redux/modules/modalSlice';
import { setLocal } from '../shared/axios/local';
import SportsImgBox from '../components/indexPage/SportsImgBox';
import ReuseBtn from '../components/reusable/ReuseBtn';


const IndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sports, setSports] = useState(null);
  const [hoverSports, setHoverSports] = useState(null);

  const selectSports = useCallback((e) => {
    const closeBtn = e.target.closest('button');
    if(closeBtn.ariaLabel !== '볼링'){
      dispatch(setDialogue({dialType: 'noService'}))
    }else{
      setSports(closeBtn.ariaLabel);
    }
  },[dispatch]);

  const showSportsName = useCallback((e) => {
    if(sports === null){
      const closeBtn = e.target.closest('button');
      setHoverSports(closeBtn.ariaLabel);
    }
  },[sports]) 

  const moveToSportsPage = useCallback(() => {
    if(sports === null){
      alert('스포츠를 선택해주세요');
      return
    }
    const sportsEn = sportsConverter(sports);
    const sportsInLocal = {
      sports: sports,
      sportsEn: sportsEn
    }
    const regionInLocal = {
      regionId: '0',
      region: '전체 지역'
    }
    //새로고침 버그 해결 위해 localstorage에 저장
    setLocal('sports', sportsInLocal);
    setLocal('region', regionInLocal);
    navigate(`/all/${sports}`);
  },[sports, navigate]);

  return (
    <IndexComp>
      <SportsComp>
        {sportsData.map((each) => 
          <SportsImgBox key={each.sportsId} clickedSports={sports} data={each} selectSports={selectSports} showSportsName={showSportsName} />
        )}
      </SportsComp>
      <SportsName>{sports ? sports: hoverSports}</SportsName>
      <ReuseBtn styleType={'normal'} content={'동네한판 하러가기'} clickEvent={moveToSportsPage} />
    </IndexComp>
  )
}

export default IndexPage;

const IndexComp = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SportsComp = styled.section`
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`
const SportsName = styled.h1`
  height: 30px;
  margin-bottom: 30px;
`