import React from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseProfile from '../y_reusable/ReuseProfile';
import ReuseTemperature from '../y_reusable/ReuseTemperature';

import you from '../../asset/profileYou.png'
import ReuseBadge from '../y_reusable/ReuseBadge';

const MatchWatch = () => {

  return(
    <ModalWatchComp>
      <MatchInfo>
        <MatchDateTimePlace>
          <MatchDate>2022.08.27</MatchDate>
          <MatchTime>11:00 (토)</MatchTime>
          <MatchPlace>
            <Place>한숲볼링센터<PlaceIcon>i</PlaceIcon></Place>
            <PlaceDetail>서울 동작구 여의대방로 250 대림쇼핑타운 3층 309호 <CopyBtn>복사하기</CopyBtn></PlaceDetail>
          </MatchPlace>
        </MatchDateTimePlace>
        <MatchHost>
            <ReuseProfile imgSrc={you} content={'영 준'} imgSize={80} contentSize={16}/>
            <ReuseBadge level={'초급'} />
          </MatchHost>
      </MatchInfo>
      <SplitHoriz />
      <Matchadditional>
        <MatchDesc>
          <MatchDescContent>주말에 함께 볼링 치실 분들 찾습니다. 남녀 무관합니다.</MatchDescContent>
        </MatchDesc>
        <ReuseTemperature tempType={'personal'} temp={69} />
      </Matchadditional>

      <MatchContact>
        <MatchIntake>모집 인원: <MatchIntakeNum>3</MatchIntakeNum>/4 명</MatchIntake>
        <ReuseBtn styleType={'stretch'} content={'연락하기'} />
      </MatchContact>
    </ModalWatchComp>
  )
};

export default MatchWatch;

const ModalWatchComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`

const MatchInfo = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const MatchHost = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const MatchDateTimePlace = styled.div`
`
const MatchDate = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: ${({theme}) => theme.fontSize.font_40};
`
const MatchTime = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: ${({theme}) => theme.fontSize.font_26};
`
const MatchPlace = styled.div`
  width: 100%;
  display: flex;
  font-size: ${({theme}) => theme.fontSize.font_32};
`
const Place = styled.div`
`
const PlaceIcon = styled.span`
  margin-left: 14px;
  font-size: ${({theme}) => theme.fontSize.font_12};
  cursor: pointer;
`
const PlaceDetail = styled.div`
  display: none;
  ${PlaceIcon}:hover{
    display: flex;
    font-size: ${({theme}) => theme.fontSize.font_14};
  }
`
const CopyBtn = styled.button`
`
const SplitHoriz = styled.hr`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
`
const Matchadditional = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`
const MatchDesc = styled.div`
  width: 240px;
  padding: 10px 0px;
  background-color: ${({theme}) => theme.colors.background_light};
  border-radius: 1rem;
`
const MatchDescContent = styled.p`
  font-size: ${({theme}) => theme.fontSize.font_14};
  padding: 0px 20px;
  line-height: 20px;
`
const MatchContact = styled.div`
  width: 100%;
  display: flex;
`
const MatchIntake = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const MatchIntakeNum = styled.span`
  margin-left: 10px;
  color: ${({theme}) => theme.colors.gray};
`