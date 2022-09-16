import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, {css} from 'styled-components';
import { contactMatchThunk } from '../../shared/redux_d/modules/matchSlice';
import { setDialogue, setModal } from '../../shared/redux_d/modules/modalSlice';
import ReuseBadge from '../y_reusable/ReuseBadge';
import ReuseBtn from '../y_reusable/ReuseBtn';


const MatchCard = ({data}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  
  const showMatch = (e) => {
    if(e.target.ariaLabel !== 'contactBtn'){
      const matchData = {
        modalType:'matchWatch',
        ...data
      }
      dispatch(setModal(matchData))
    }
  }
  const contactToHost = () => {
    // const applyData = {
    //   matchId: null,
    //   username: userData.username,
    //   userLevel: userData.userLevel,
    //   userTemperature: userData.userTemperature,
    // };
    // dispatch(contactMatchThunk(applyData));

    // 신청하고 알림받아서 수락하는 과정 생략
    // 바로 chatRoom에 입장하기
    dispatch(setDialogue({dialType: 'confirmApply', matchId: data.id}));
  };

  return(
    <MatchComp matchState={data.matchState} onClick={showMatch}>
      <MatchDate matchState={data.matchState}>
        <MatchDayTimePlace>
          <MatchDay>{data.matchDay}</MatchDay>
          <MatchTime matchState={data.matchState}>{data.matchTime}</MatchTime>
          <MatchPlace>{data.matchPlace}</MatchPlace>
        </MatchDayTimePlace>
        {data.matchState !== 'done' ? <ReuseBadge bdgType={'rank'} content={data.hostLevel} /> : <></>}
      </MatchDate>
      <MatchBtns>
        <MatchIntake matchState={data.matchState}>
          <MatchIntakeCnt
            matchState={data.matchState}
            isFull={data.matchIntakeCnt === data.matchIntakeFull}>
            {data.matchIntakeCnt}
          </MatchIntakeCnt>/
          <MatchIntakeFull>{data.matchIntakeFull}</MatchIntakeFull> 명
        </MatchIntake>
        {data.matchState === 'done' ? 
          <ReuseBtn styleType={'done'} content={'완 료'} />
          :<ReuseBtn name={'contactBtn'} styleType={'shrink'} content={'연락하기'} clickEvent={contactToHost} />
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
  ${({matchState,theme}) => {
    if(matchState === 'reserved'){
      return css`
      border: 2px solid ${theme.colors.skyblue};
      &:hover{
        filter: drop-shadow(8px 4px 2px ${theme.colors.gray});
        transition: filter 0.3s ease-in;
      }
      `
    } else if(matchState === 'recruit'){
      return css`
      &:hover{
        filter: drop-shadow(8px 4px 2px ${theme.colors.gray});
        transition: filter 0.3s ease-in;
      }
      `
    } else if(matchState === 'done'){
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
  color: ${({matchState,theme}) => matchState === 'done' ? theme.colors.gray : theme.colors.darkgray };
`
const MatchPlace = styled.span`
  margin-right: 10px;
  font-weight: ${({theme}) => theme.fontWeight.bold};
  font-size: ${({theme}) => theme.fontSize.font_20};
`
const MatchBtns = styled.div`
  display: flex;
  color: ${({matchState, theme}) => matchState === 'done' ? theme.colors.gray : theme.colors.black}
`
const MatchIntake = styled.div`
  margin-right: 14px;
  color: ${({matchState, theme}) => matchState === 'done' ? theme.colors.gray : theme.colors.black};
  font-size: ${({theme}) => theme.fontSize.font_20};
  font-weight:${({theme}) => theme.fontWeight.bold};
`
const MatchIntakeCnt = styled.span`
  color: ${({matchState,isFull, theme}) => isFull&&(matchState !== 'done') ? theme.colors.black : theme.colors.gray};
`
const MatchIntakeFull = styled.span`
`

