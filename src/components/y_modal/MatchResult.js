import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Result from '../chatPage/Results';
import ReuseBtn from '../y_reusable/ReuseBtn';
import ReuseInput from '../y_reusable/ReuseInput';


const MatchResult = () => {
  const modalData = useSelector((state) => state.modal.modalData);
  const myScore = useRef(null);
  
  return(
    <ModalResultComp>
      <MatchDateTimePlace>
        <MatchDay>{modalData.matchDay}<MatchTime>{modalData.matchTime}</MatchTime></MatchDay>
        
        <MatchPlace>{modalData.matchPlace}</MatchPlace>
      </MatchDateTimePlace>

      <ResultFormContainer>
        <Sep> - - - - - - - - - - - -  나의 결과 입력  - - - - - - - - - - - -</Sep>
          <InputTitleBox>
            <InputTitle>나의 점수</InputTitle>
          </InputTitleBox>
          <ReuseInput injRef={myScore} injType={'number'} placeholderValue={'0 ~ 300점 (숫자 만 표기) '} />
        {modalData.participants.map((each) => 
          <Result key={each.id} data={each}/>
        )}

      </ResultFormContainer>
      <ReuseBtn styleType={'stretch'} content={'완료'} />
    </ModalResultComp>
  )
};

export default MatchResult;

const ModalResultComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const MatchDateTimePlace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 10px;
`
const MatchDay = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: ${({theme}) => theme.fontSize.font_40};
`
const MatchTime = styled.span`
  width: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: ${({theme}) => theme.fontSize.font_26};
`
const MatchPlace = styled.div`
  width: 100%;
  display: flex;
  font-size: ${({theme}) => theme.fontSize.font_32};
`

const Sep = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  overflow-x: hidden;
`

const ResultFormContainer = styled.div`
  height: 330px;
  margin-bottom: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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