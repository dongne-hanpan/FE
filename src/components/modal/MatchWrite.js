import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseInput from '../reusable/ReuseInput';
import ReuseTextarea from '../reusable/ReuseTextarea';
import { getLocal } from '../../shared/axios/local';
import { setDialogue } from '../../shared/redux/modules/modalSlice';
import { makeMatchThunk } from '../../shared/redux/modules/matchSlice';
import bowlingData from '../../data/bowlingData';
import KaKaoMap from '../../shared/KaKaoMap';


const MatchWrite = () => {
  const dispatch = useDispatch();
  const whenMsg = useRef(null);
  const [whenErr, setWhenErr] = useState('none');
  const intakeMsg = useRef(null);
  const [intakeErr, setIntakeErr] = useState('none');
  const matchDateRef = useRef(null);
  const matchDescRef = useRef(null);
  const intakeRef = useRef(null);
  const [place, setPlace] = useState(null);
  
  //이전 날짜 불가능하게 만들기
  useEffect(() => {
    matchDateRef.current.min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -8);
    const now = new Date();
    const maxDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    matchDateRef.current.max = maxDate.toISOString().slice(0, -8);
    matchDateRef.current.click();
  },[]);
  const preventKeyDown = (e) => {
    e.preventDefault();
  }

  const selectChangeHandler = (e) => {
    setPlace(e.target.value);
  }
  const makeMatch = () => {
    const matchDateValue = matchDateRef.current.value;
    const intakeValue = intakeRef.current.value;
    if(!matchDateValue){
      whenMsg.current.innerText = '날짜, 시간을 선택해주세요';
      setWhenErr('danger');
      return
    }
    if(!place){
      whenMsg.current.innerText = '장소를 선택해주세요';
      setWhenErr('danger');
      return
    }
    //날짜 시간 장소 통과 시 
    whenMsg.current.innerText = '';
    setWhenErr('none');

    //모집인원 유효성 검사
    if(intakeValue === null || intakeValue <1 || intakeValue >6){
      intakeMsg.current.innerText = '유효하지 않은 인원';
      setIntakeErr('danger');
      return
    }
    //모집인원 통과 시
    intakeMsg.current.innerText = '';
    setIntakeErr('none');

    const matchDateValueArray = matchDateValue.split('T');
    const matchDay = matchDateValueArray[0];
    const matchTime = matchDateValueArray[1];
    const sportsEn = getLocal('sports').sportsEn;
    const regionId = getLocal('region').regionId;
    const selectPlaceArray = place.split(',');

    const matchMakeData = {
      sports: sportsEn,
      region: parseInt(regionId),
      matchStatus: 'recruit',
      date: matchDay,
      time: matchTime,
      place: selectPlaceArray[0],
      placeDetail: selectPlaceArray[1],
      contents: matchDescRef.current.value ? matchDescRef.current.value : '누구든지 환영합니다.',
      matchIntakeFull: intakeValue,
    }
    dispatch(makeMatchThunk(matchMakeData));
    dispatch(setDialogue({dialType: 'confirmWrite'}))
  }
  const thisRegionBowling = () => {
    const regionData = getLocal('region');
    const nowRegionId = regionData.regionId;
    return bowlingData[nowRegionId];
  }

  return(
    <ModalWriteComp>
      <InputTitleBox>
        <InputTitle>일자, 시간, 장소<ErrMessage ref={whenMsg} status={whenErr}></ErrMessage></InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={matchDateRef} injType={'datetime-local'} keyDownEvent={preventKeyDown} />
      <PlaceSection>
        <PlaceSelect onChange={selectChangeHandler}>
          {thisRegionBowling().map((each) => 
            <PlaceOption key={each.value} value={[each.value,each.address]}>
              {each.value}
            </PlaceOption>
          )}
        </PlaceSelect>
        <PlaceMap>
          <KaKaoMap
            nowPlace={place ? place.split(',')[0] : null} 
            nowAddress={place ? place.split(',')[1] : null} />
        </PlaceMap>
      </PlaceSection>
      <InputTitleBox>
        <InputTitle>하고싶은 말</InputTitle>
      </InputTitleBox>
      <ReuseTextarea injRef={matchDescRef} height={90} placeholderValue={'구체적인 모집 조건이나 하고 싶은 말을 남겨주세요'} />
      <InputTitleBox>
        <InputTitleSmall>총 인원<ErrMessage ref={intakeMsg} status={intakeErr}></ErrMessage></InputTitleSmall>
        <ReuseInput injRef={intakeRef} injType={'number'} placeholderValue={'본인 포함 1 ~ 6 명까지'}/>
      </InputTitleBox>
      <ReuseBtn styleType={'stretch'} content={'게시하기'} clickEvent={makeMatch} />
    </ModalWriteComp>
  )
};

export default MatchWrite;

const ModalWriteComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`
const InputTitleBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`
const InputTitle = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const ErrMessage = styled.span`
  margin: 0px 10px;
  font-size: ${({theme}) => theme.fontSize.font_12};
  ${({status, theme}) => {
    if(status === 'success'){
      return css`
      display: inline;
      color: ${theme.colors.green};
      `
    } else if(status === 'danger'){
      return css`
      display: inline;
      color: ${theme.colors.red_light};
      `
    } else if(status === 'none'){
      return css`
      display: none;
      `
    }
  }}
`
const PlaceSection = styled.div`
  position: relative;
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
`
const PlaceSelect = styled.select`
  position: absolute;
  top: 4px;
  left: 6px;
  height: 40px;
  padding: 0px 10px;
  border: 2px solid ${({theme}) => theme.colors.gray};
  border-radius: 0.5rem;
  z-index: 1;
`
const PlaceOption = styled.option.attrs(({address}) => ({
    disabled : address === 'default' ? true : false,
  }))`
  height: 40px;
  padding: 0px 20px;
`
const PlaceMap = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  margin-bottom: 12px;
`
const InputTitleSmall = styled.div`
  width: 330px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 14px;
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`