import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseInput from '../y_reusable/ReuseInput';
import ReuseTextarea from '../y_reusable/ReuseTextarea';
import { getLocal } from '../../shared/axios_d/local';
import { setDialogue } from '../../shared/redux_d/modules/modalSlice';
import { makeMatchThunk } from '../../shared/redux_d/modules/matchSlice';
//temp
import dummyOptionValues from '../../dummyData/dummyOptionValues';


const MatchWrite = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const matchDateRef = useRef(null);
  const matchDescRef = useRef(null);
  const intakeRef = useRef(null);
  const [place, setPlace] = useState(null);
  //이전 날짜 불가능하게 만들기
  useEffect(() => {
    matchDateRef.current.min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -8);
  },[]);

  const selectChangeHandler = (e) => {
    setPlace(e.target.value);
  }
  const makeMatch = () => {
    const matchDateValue = matchDateRef.current.value.split('T');
    const intakeValue = intakeRef.current.value;
    if(!matchDateValue){
      console.log('날짜를 선택해주세요');
      return
    }
    if(!place){
      console.log('장소를 선택해주세요');
      return
    }
    if(intakeValue === null || intakeValue <2 || intakeValue >6){
      console.log('모집 인원을 확인해주세요');
      return
    }
    const matchDay = matchDateValue[0];
    const matchTime = matchDateValue[1];
    const regionAndSports = getLocal('regionAndSports');
    const sports = regionAndSports.sports;
    const regionId = regionAndSports.regionId;
    const selectPlaceArray = place.split(',');

    const matchMakeData = {
      sports: sports,
      region: regionId,
      matchState: 'recruit',
      date: matchDay,
      time: matchTime,
      place: selectPlaceArray[0],
      placeDetail: selectPlaceArray[1],
      contents: matchDescRef.current.value ? matchDescRef.current.value : '누구든지 환영합니다.',
      max_user: intakeValue,
      now_user: 1
    }
    console.log(matchMakeData);
    dispatch(makeMatchThunk(matchMakeData));
    dispatch(setDialogue({dialType: 'confirmWrite'}))
  }
  // const getMatches = () => {
  // }

  return(
    <ModalWriteComp>
      <InputTitleBox>
        <InputTitle>일자, 시간, 장소</InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={matchDateRef} injType={'datetime-local'} />

      <PlaceSection>
        <PlaceSelect className="selectBox" onChange={selectChangeHandler}>
          {dummyOptionValues.map((each) => 
            <PlaceOption key={each.value} value={[each.value,each.address]}>
              {each.value}
            </PlaceOption>
          )}
        </PlaceSelect>
        <PlaceMap>
          <div>네이버 지도</div>
        </PlaceMap>
      </PlaceSection>
      <InputTitleBox>
        <InputTitle>하고싶은 말</InputTitle>
      </InputTitleBox>
      <ReuseTextarea injRef={matchDescRef} height={90} placeholderValue={'구체적인 모집 조건이나 하고 싶은 말을 남겨주세요'} />
      <InputTitleBox>
        <InputTitleSmall>모집 인원</InputTitleSmall>
        <ReuseInput injRef={intakeRef} injType={'number'} placeholderValue={'ex) 6, (최대 인원: 6 명)'}/>
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
  border: none;
  border-radius: 0.5rem;
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
  background-color: ${({theme}) => theme.colors.skyblue};
  border-radius: 0.5rem;
  margin-bottom: 12px;
`
const InputTitleSmall = styled.div`
  width: 280px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 14px;
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`