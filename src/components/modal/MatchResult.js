import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { submitMyResultThunk } from '../../shared/redux/modules/chatSlice';
import { getLocal } from '../../shared/axios/local';
import { clearModal } from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseInput from '../reusable/ReuseInput';


const MatchResult = () => {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.nowChatData);
  const modalData = useSelector((state) => state.modal.modalData);
  const scrollComp = useRef(null);
  const myScore = useRef(null);
  const sportsEn = getLocal('sports').sportsEn;
  const myResultMsg = useRef(null);
  const [myResultErr, setResultErr] = useState('none');
  
  const submitResult = () => {
    // 나의 결과 입력
    const myScoreValue = parseInt(myScore.current.value);
    if(0 <= myScoreValue && myScoreValue <= 300){
      myResultMsg.current.innerText = '';
      setResultErr('none');
      const myResultData = {
        "match_id": chatData.match_id,
        "myScore": myScoreValue
      }
      console.log(myResultData);
      dispatch(submitMyResultThunk(sportsEn,myResultData));
    } else{
      setResultErr('danger');
      myResultMsg.current.innerText = '점수 범위를 벗어났습니다';
      return
    }
    dispatch(clearModal());
  }
  
  return(
    <ModalResultComp>
      <MatchCommentHeader>
        <SportsImg src={modalData.sportsImage} alt='sports' />
        <MatchDateTimePlace>
          <MatchDay>{chatData.date}</MatchDay>
          <MatchTime>{chatData.time}</MatchTime>
          <MatchPlace>{chatData.place}</MatchPlace>
        </MatchDateTimePlace>
      </MatchCommentHeader>

      <ResultFormContainer>
        <Sep> - - - - - - - - - - - -  나의 결과 입력  - - - - - - - - - - - -</Sep>
        <InputTitleBox ref={scrollComp}>
          <InputTitle>나의 점수<ErrMessage ref={myResultMsg} status={myResultErr}></ErrMessage></InputTitle>
        </InputTitleBox>
        <ReuseInput injRef={myScore} injType={'number'} placeholderValue={'0 ~ 300점 (숫자 만 표기) '} />
        <Sep> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Sep>
      </ResultFormContainer>
      <ReuseBtn styleType={'stretch'} content={'완료'} clickEvent={submitResult} />
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
const MatchCommentHeader = styled.article`
  display: flex;
  margin-bottom: 30px;
`
const MatchDateTimePlace = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 10px;
`
const MatchDay = styled.div`
  width: 100%;
  margin-bottom: 6px;
  font-size: ${({theme}) => theme.fontSize.font_36};
`
const MatchTime = styled.div`
  width: 100%;
  margin-bottom: 6px;
  font-size: ${({theme}) => theme.fontSize.font_26};
`
const MatchPlace = styled.div`
  width: 100%;
  display: flex;
  font-size: ${({theme}) => theme.fontSize.font_32};
`
const SportsImg = styled.img`
  width: 130px;
  height: auto;
  margin-right: 14px;
  border-radius: 2rem 1rem 1rem 0rem;
`
const Sep = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  overflow-x: hidden;
`

const ResultFormContainer = styled.div`
  height: 240px;
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
const ErrMessage = styled.span`
  margin-left: 10px;
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