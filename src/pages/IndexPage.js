import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sportsData, sportsConverter } from '../data/regionSportsData';
import { setDialogue } from '../shared/redux/modules/modalSlice';
import { setLocal } from '../shared/axios/local';
import ReuseBtn from '../components/reusable/ReuseBtn';


const IndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sports, setSports] = useState(null);
  const [hoverSports, setHoverSports] = useState(null);

  const selectSports = (e) => {
    const closeBtn = e.target.closest('button');
    if(closeBtn.ariaLabel !== '볼링'){
      dispatch(setDialogue({dialType: 'noService'}))
    }else{
      setSports(closeBtn.ariaLabel);
    }
  };

  const showSportsName = (e) => {
    if(sports === null){
      const closeBtn = e.target.closest('button');
      setHoverSports(closeBtn.ariaLabel);
    }
  }

  const moveToSportsPage = () => {
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
  }

  return (
    <IndexComp>
      <SportsComp>
        {sportsData.map((each) => 
          <SportsImgBox key={each.sportsId} aria-label={each.sports} onClick={selectSports} onMouseEnter={showSportsName}>
            <SportsImg src={each.sportsImage} alt={each.sports} sports={sports} />
          </SportsImgBox>
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
const SportsImgBox = styled.button`
  width: 200px;
  margin: 0px 10px;
  margin-bottom: 20px;
  border-radius: 2rem 1rem 1rem 0rem;
`
const SportsImg = styled.img`
  width: 200px;
  height: auto;
  border-radius: 2rem 1rem 1rem 0rem;
  border: 3px solid ${({alt, sports, theme}) => alt === sports ?  theme.colors.skyblue: theme.colors.background};
  &:hover{
    border: 3px solid ${({theme}) => theme.colors.skyblue};
  }
`
const SportsName = styled.h1`
  height: 30px;
  margin-bottom: 30px;
`