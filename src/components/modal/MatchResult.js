import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { submitCommentThunk, submitResultThunk } from '../../shared/redux/modules/chatSlice';
import Result from '../chatPage/Results';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseInput from '../reusable/ReuseInput';
import {getLocal} from '../../shared/axios/local';
import { clearModal } from '../../shared/redux/modules/modalSlice';


const MatchResult = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modal.modalData);
  const chatData = useSelector((state) => state.chat.nowChatData);
  const myScore = useRef(null);
  const regionAndSports = getLocal('regionAndSports');
  const sportsEn = regionAndSports.sportsEn;
  
  const submitResult = () => {
    // 유효성 검사는 나중에
    // 나의 결과 입력
    const myScoreValue = myScore.current.value;
    const resultData = {
      match_id: chatData.match_id,
      myScore: myScoreValue
    }
    dispatch(submitResultThunk(sportsEn,resultData));

    // 상대 후기 입력
    const reviews = Array.from(document.getElementsByClassName('review'));
    const manners = Array.from(document.getElementsByClassName('manner'));
    for(let i=0;i<reviews.length;i++){
      const reviewData = {
        match_id: chatData.match_id,
        nickname: chatData.userListInMatch[i+1].nickname,
        comment: reviews[i].value,
        mannerPoint: manners[i].value
      };
      dispatch(submitCommentThunk(reviewData));
    }
    dispatch(clearModal());
  }
  
  return(
    <ModalResultComp>
      <MatchDateTimePlace>
        <MatchDay>{chatData.date}<MatchTime>{chatData.time}</MatchTime></MatchDay>
        <MatchPlace>{chatData.place}</MatchPlace>
      </MatchDateTimePlace>

      <ResultFormContainer>
        <Sep> - - - - - - - - - - - -  나의 결과 입력  - - - - - - - - - - - -</Sep>
          <InputTitleBox>
            <InputTitle>나의 점수</InputTitle>
          </InputTitleBox>
          <ReuseInput injRef={myScore} injType={'number'} placeholderValue={'0 ~ 300점 (숫자 만 표기) '} />
          {modalData.reservedPeople.map((each) => {
            console.log(each);
            if(each.nickname !== chatData.writer){
              return <Result key={each.nickname} data={each}/>
            }
          })}
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