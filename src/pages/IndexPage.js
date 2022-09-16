import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReuseBtn from '../components/reusable/ReuseBtn';
import { setLocal } from '../shared/axios/local';

//temp
import { dummyRegion, dummySports, sportsConverter } from '../dummyData/dummyIndex';


const IndexPage = () => {
  const navigate = useNavigate();
  const [region, setRegion] = useState(null);
  const [sports, setSports] = useState(null);
  const [hoverSports, setHoverSports] = useState(null);

  const selectChangeHandler = (e) => {
    const regionArray = e.target.value.split(',');
    const regionId = regionArray[0];
    const selectRegion = regionArray[1];
    setRegion([regionId, selectRegion]);
  };
  const selectSports = (e) => {
    const closeBtn = e.target.closest('button');
    setSports(closeBtn.ariaLabel);
  };
  const showSportsName = (e) => {
    if(sports === null){
      const closeBtn = e.target.closest('button');
      setHoverSports(closeBtn.ariaLabel);
    }
  }
  const moveToSportsPage = () => {
    if(region === null){
      alert('지역을 선택해주세요');
      return
    }
    if(sports === null){
      alert('스포츠를 선택해주세요');
      return
    }
    const sportsEn = sportsConverter(sports);
    const regionAndSports = {
      regionId: region[0],
      region: region[1],
      sports: sports,
      sportsEn: sportsEn
    }
    //새로고침 버그 해결 위해 localstorage에 저장
    setLocal('regionAndSports', regionAndSports);
    navigate(`/${region[1]}/${sports}`);
  }
  return (
    <IndexComp>
      <RegionComp>
        <RegionDropbox region={region? region[1]: null} onChange={selectChangeHandler}>
          <RegionOption>지역을 선택하세요</RegionOption>
          {dummyRegion.map((each) => 
            <RegionOption key={each.regionId} value={[each.regionId,each.region]}>{each.region}</RegionOption>
          )}
        </RegionDropbox>
      </RegionComp>
      <SportsComp>
        {dummySports.map((each) => 
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
  align-items: center;
`
const RegionComp = styled.section`
  width: 700px;
  display: flex;
  justify-content: flex-end;
  margin: 20px 20px;
  margin-bottom: 30px;
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

`
const RegionOption = styled.option`
  padding: 10px;

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
  margin-bottom: 14px;
`