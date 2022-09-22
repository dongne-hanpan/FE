import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { submitCommentThunk, submitResultThunk } from '../../shared/redux/modules/chatSlice';
import Result from '../chatPage/Results';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseInput from '../reusable/ReuseInput';
import {getLocal} from '../../shared/axios/local';
import { clearModal } from '../../shared/redux/modules/modalSlice';


const MatchResult = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const chatData = useSelector((state) => state.chat.nowChatData);
  const scrollComp = useRef(null);
  const myScore = useRef(null);
  const commentRef = useRef([]);
  const sportsEn = getLocal('sports').sportsEn;
  const participantWithoutMe = chatData.userListInMatch.filter((each) => 
    each.nickname !== userData.nickname);
  const myResultMsg = useRef(null);
  const [myResultErr, setResultErr] = useState('none');
  
  const submitResult = () => {
    // 나의 결과 입력
    const myScoreValue = parseInt(myScore.current.value);
    if(0 <= myScoreValue && myScoreValue <= 300){
      myResultMsg.current.innerText = '';
      setResultErr('none');
      const resultData = {
        match_id: chatData.match_id,
        myScore: myScoreValue
      }
      dispatch(submitResultThunk(sportsEn,resultData));
    } else{
      setResultErr('danger');
      myResultMsg.current.innerText = '점수 범위를 벗어났습니다';
      scrollComp.current.scrollIntoView({behavior: "smooth"});
      return
    }

    // 차례로 상대 후기 입력
    const reviews = Array.from(document.getElementsByClassName('review'));
    const manners = Array.from(document.getElementsByClassName('manner'));
    for(let i=0;i<reviews.length;i++){
      const reviewValue = manners[i].value;
      const mannerValue = parseInt(manners[i].value);

      if(0<= mannerValue && mannerValue <= 10){
        const reviewData = {
          match_id: chatData.match_id,
          nickname: participantWithoutMe[i].nickname,
          comment: reviewValue,
          mannerPoint: mannerValue
        }
        dispatch(submitCommentThunk(reviewData));
      }else{
        alert(`${participantWithoutMe[i].nickname}님의 매너점수가 점수 범위를 벗어났습니다 \n\n 0 에서 10 점까지 가능합니다`);
        commentRef.current[i].scrollIntoView({behavior: "smooth"});
        return
      };
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
          <InputTitleBox ref={scrollComp}>
            <InputTitle>나의 점수<ErrMessage ref={myResultMsg} status={myResultErr}></ErrMessage></InputTitle>
          </InputTitleBox>
          <ReuseInput injRef={myScore} injType={'number'} placeholderValue={'0 ~ 300점 (숫자 만 표기) '} />
          {participantWithoutMe.map((each, idx) => 
            <Result key={each.nickname} injRef={el => (commentRef.current[idx] = el)} data={each}/>
          )}
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