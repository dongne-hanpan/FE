import React from 'react';
import styled, {css} from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactHostThunk } from '../../shared/redux/modules/alermSlice';
import { setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import ReuseBadge from '../reusable/ReuseBadge';
import ReuseBtn from '../reusable/ReuseBtn';


const MatchCard = ({data}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  
  const showMatch = (e) => {
    if(e.target.ariaLabel === 'contactBtn' || e.target.ariaLabel === 'removeBtn'){
      return
    }
    const matchData = {
      modalType:'matchWatch',
      ...data
    }
    dispatch(setModal(matchData))
  }
  const checkParticipant = () => {
    const userListInMatch = data.userListInMatch;
    for(let i=0; i<userListInMatch.length; i++){
      if(userListInMatch[i].nickname === userData.nickname){
        return true;
      }
    }
    return false;
  }
  const contactToHost = () => {
    if(userData.nickname !== undefined){
      if(checkParticipant() === false){
        dispatch(contactHostThunk(data.match_id));
      }else{
        navigate(`/chat/${data.match_id}`)
      }
    }else{
      dispatch(setDialogue({dialType: 'confirmLogin'}))
    }
  };

  return(
    <MatchComp matchStatus={data.matchStatus} onClick={showMatch}>
      <MatchDate matchStatus={data.matchStatus}>
        <MatchDayTimePlace>
          <MatchDay>{data.date}</MatchDay>
          <MatchTime matchStatus={data.matchStatus}>{data.time}</MatchTime>
          <MatchPlace>{data.place}</MatchPlace>
        </MatchDayTimePlace>
        {data.matchStatus !== 'done' ? <ReuseBadge bdgType={'rank'} content={data.level_HOST} /> : <></>}
      </MatchDate>
      <MatchBtns>
        <MatchIntake matchStatus={data.matchStatus}>
          <MatchIntakeCnt
            matchStatus={data.matchStatus}
            isFull={data.matchIntakeCnt === data.matchIntakeFull}>
            {data.matchIntakeCnt}
          </MatchIntakeCnt>/
          <MatchIntakeFull>{data.matchIntakeFull}</MatchIntakeFull> ???
        </MatchIntake>
        {data.matchStatus === 'done' ? 
          <ReuseBtn styleType={'done'} content={'??? ???'} />
          :<ReuseBtn name={'contactBtn'} styleType={'shrink'} content={checkParticipant() ? '????????? ??????':'????????????'} clickEvent={contactToHost} />
        }
      </MatchBtns>
    </MatchComp>
  )
};

export default MatchCard;


const MatchComp = styled.li`
  width: 700px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  margin-bottom: 20px;
  border-radius: 1rem;
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  background-color: ${({theme}) => theme.colors.background_light};
  ${({matchStatus,theme}) => {
    if(matchStatus === 'reserved'){
      return css`
      border: 2px solid ${theme.colors.skyblue};
      &:hover{
        filter: drop-shadow(8px 4px 2px ${theme.colors.gray});
        transition: filter 0.3s ease-in;
      }
      `
    } else if(matchStatus === 'recruit'){
      return css`
      &:hover{
        filter: drop-shadow(8px 4px 2px ${theme.colors.gray});
        transition: filter 0.3s ease-in;
      }
      `
    } else if(matchStatus === 'done'){
      return css`
      color: ${theme.colors.gray};
      `
    }
  }}
`

const MatchDate = styled.div`
  display: flex;
  align-items: center;
  .badge{
    font-size: ${({theme}) => theme.fontSize.font_12};
  }
`
const MatchDayTimePlace = styled.div`
`
const MatchDay = styled.span`
  font-size: ${({theme}) => theme.fontSize.font_24};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  margin-right: 10px;
`
const MatchTime = styled.span`
  margin-right: 10px;
  font-weight: ${({theme}) => theme.fontWeight.bold};
  color: ${({matchStatus,theme}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.darkgray };
`
const MatchPlace = styled.span`
  margin-right: 10px;
  font-weight: ${({theme}) => theme.fontWeight.bold};
  font-size: ${({theme}) => theme.fontSize.font_20};
`
const MatchBtns = styled.div`
  display: flex;
  color: ${({matchStatus, theme}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.black}
`
const MatchIntake = styled.div`
  margin-right: 14px;
  color: ${({matchStatus, theme}) => matchStatus === 'done' ? theme.colors.gray : theme.colors.black};
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight:${({theme}) => theme.fontWeight.bold};
`
const MatchIntakeCnt = styled.span`
  color: ${({matchStatus,isFull, theme}) => isFull&&(matchStatus !== 'done') ? theme.colors.black : theme.colors.gray};
`
const MatchIntakeFull = styled.span`
`