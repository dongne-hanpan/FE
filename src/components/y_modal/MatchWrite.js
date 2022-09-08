import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseInput from '../y_reusable/ReuseInput';
import ReuseTextarea from '../y_reusable/ReuseTextarea';

//temp
const dummyOptionValues = [
  { value:'장소 선택', address: "default" },
  { value:'한숲볼링센터', address: "서울 동작구 여의대방로 250 대림쇼핑타운 3층 309호" },
  { value:'성대볼링센타', address: "서울 동작구 상도로 102 성대시장 3층" },
  { value:'보라매볼링장', address: "서울 동작구 보라매로5가길 16 아카데미 타워 7층" }
]

const MatchWrite = () => {
  const matchDateRef = useRef(null);
  useEffect(() => {
    matchDateRef.current.min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -8);
  },[]);
  const selectChangeHandler = (e) => {
    console.log(e.target.value)
  }

  return(
    <ModalWriteComp>
      <InputTitleBox>
        <InputTitle>일자 및 시간</InputTitle>
      </InputTitleBox>
      <ReuseInput injRef={matchDateRef} injType={'datetime-local'} />

      <InputTitleBox>
        <InputTitle>장소</InputTitle>
      </InputTitleBox>
      <PlaceSection>
        <PlaceSelect className="selectBox" onChange={selectChangeHandler}>
          {dummyOptionValues.map((each) => 
            <PlaceOption key={each.value} value={each.value} address={each.address}>
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
      <ReuseTextarea height={100} placeholderValue={'구체적인 모집 조건이나 하고 싶은 말을 남겨주세요'} />
      <ReuseBtn styleType={'stretch'} content={'게시하기'} />
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
  margin-bottom: 10px;
`
const InputTitle = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
  & span{
    display: none;
  }
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
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.skyblue};
  border-radius: 0.5rem;
  margin-bottom: 14px;
`