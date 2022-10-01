import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { submitCommentThunk } from '../../shared/redux/modules/chatSlice';
import Result from '../chatPage/Results';
import ReuseBtn from '../reusable/ReuseBtn';
import { clearModal, setDialogue } from '../../shared/redux/modules/modalSlice';


const MatchComment = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const modalData = useSelector((state) => state.modal.modalData);
  const chatData = useSelector((state) => state.chat.nowChatData);
  const commentRef = useRef([]);
  const participantWithoutMe = chatData.userListInMatch.filter((each) => 
    each.nickname !== userData.nickname);
  
  const submitComment = async() => {
    // 차례로 상대 후기 입력
    const reviews = Array.from(document.getElementsByClassName('review'));
    const manners = Array.from(document.getElementsByClassName('manner'));
    for(let i=0;i<reviews.length;i++){
      const reviewValue = reviews[i].value;
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
    <ModalCommentComp>
      <MatchCommentHeader>
        <SportsImg src={modalData.sportsImage} alt='sports' />
        <MatchDateTimePlace>
          <MatchDay>{chatData.date}</MatchDay>
          <MatchTime>{chatData.time}</MatchTime>
          <MatchPlace>{chatData.place}</MatchPlace>
        </MatchDateTimePlace>
      </MatchCommentHeader>

      <ResultFormContainer>
        {participantWithoutMe.map((each, idx) => 
          <Result key={each.nickname} injRef={el => (commentRef.current[idx] = el)} data={each}/>
        )}
        <Sep> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Sep>
      </ResultFormContainer>
      <ReuseBtn styleType={'stretch'} content={'완료'} clickEvent={submitComment} />
    </ModalCommentComp>
  )
};

export default MatchComment;

const ModalCommentComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`
const MatchCommentHeader = styled.article`
  display: flex;
  margin-bottom: 10px;
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
  margin: 10px 0px;
  overflow-x: hidden;
`

const ResultFormContainer = styled.div`
  height: 300px;
  margin-bottom: 14px;
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