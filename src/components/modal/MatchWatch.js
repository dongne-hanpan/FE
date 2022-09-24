import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearModal, setDialogue, setModal } from '../../shared/redux/modules/modalSlice';
import { contactHostThunk } from '../../shared/redux/modules/matchSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import ReuseProfile from '../reusable/ReuseProfile';
import ReuseTemperature from '../reusable/ReuseTemperature';
import ReuseBadge from '../reusable/ReuseBadge';

const MatchWatch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const modalData = useSelector((state) => state.modal.modalData);

  const showUserDetail = () => {
    const userDetailData = {
      nickname: modalData.writer,
      profileImage: modalData.profileImage_HOST,
      userLevel: modalData.level_HOST,
      averageScore: 0,
      matchCount: 0,
      mannerPoint: modalData.mannerPoint_HOST,
    }
    dispatch(setModal({modalType: 'userWatch', userData: userDetailData}))
  }

  const copyPlaceDetail = async() => {
    const placeDetail = modalData.matchPlaceDetail;
    await navigator.clipboard.writeText(placeDetail);
    alert('주소가 복사되었습니다');
  }
  const checkParticipant = () => {
    const userListInMatch = modalData.userListInMatch;
    for(let i=0; i<userListInMatch.length; i++){
      if(userListInMatch[i].nickname === userData.nickname){
        return true;
      }
    }
    return false;
  }
  const contactToHost = async() => {
    if(checkParticipant() === false){
      const res = await dispatch(contactHostThunk(modalData.match_id));
      if(res.payload === '참여 가능 인원이 초과되었습니다'){
        dispatch(setDialogue({dialType: 'denyContact'}));
      }else if(res.payload === '이미 신청한 매치 입니다'){
        dispatch(setDialogue({dialType: 'denyContactAgain'}));
      }else{
        dispatch(setDialogue({dialType: 'confirmApply', matchId: modalData.match_id}));
      }
    }else{
      navigate(`/chat/${modalData.match_id}`)
    }
  };
  return(
    <ModalWatchComp>
      <MatchInfo>
        <MatchDateTimePlace>
          <MatchDay>{modalData.date}</MatchDay>
          <MatchTime>{modalData.time}</MatchTime>
          <MatchPlace>
            <Place>{modalData.place}
            <PlaceIcon>info
              <PlaceDetail>{modalData.placeDetail}<CopyBtn onClick={copyPlaceDetail}>복사하기</CopyBtn></PlaceDetail>
            </PlaceIcon>
            </Place>
          </MatchPlace>
        </MatchDateTimePlace>
        <MatchHost>
            <ReuseProfile imgSrc={modalData.profileImage_HOST} content={modalData.writer} imgSize={80} contentSize={16} clickEvent={showUserDetail} />
            <ReuseBadge bdgType={'rank'} content={modalData.level_HOST} />
          </MatchHost>
      </MatchInfo>
      <SplitHoriz />
      <Matchadditional>
        <MatchDesc>
          <MatchDescContent>{modalData.contents}</MatchDescContent>
        </MatchDesc>
        <ReuseTemperature type={'personal'} type2={'temper'} data={modalData.mannerPoint_HOST} />
      </Matchadditional>

      <MatchContact>
        <MatchIntake>
          모집 인원: 
          <MatchIntakeNum isFull={modalData.matchIntakeCnt === modalData.matchIntakeFull}>
            {modalData.matchIntakeCnt}
          </MatchIntakeNum>
          /{modalData.matchIntakeFull} 명
        </MatchIntake>
        {
          modalData.hostNickname !== userData.nickname ?
          <ReuseBtn styleType={'stretch'} content={checkParticipant() ? '채팅방 가기':'연락하기'} clickEvent={contactToHost} />
          :<ReuseBtn styleType={'stretch'} content={'수정하기'} />
        }
      </MatchContact>
    </ModalWatchComp>
  )
};

export default MatchWatch;

const ModalWatchComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`

const MatchInfo = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const MatchHost = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const MatchDateTimePlace = styled.div`
`
const MatchDay = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: ${({theme}) => theme.fontSize.font_40};
`
const MatchTime = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: ${({theme}) => theme.fontSize.font_26};
`
const MatchPlace = styled.div`
  width: 100%;
  display: flex;
  font-size: ${({theme}) => theme.fontSize.font_32};
`
const Place = styled.div`
`
const PlaceIcon = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 2rem;
  margin-left: 7px;
  background-color: ${({theme}) => theme.colors.background_light};
  font-size: ${({theme}) => theme.fontSize.font_12};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const PlaceDetail = styled.div`
  position: absolute;
  top: -2px;
  left: 0px;
  width: 200px;
  min-height: 40px;
  display: none;
  padding: 10px;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.colors.background_light};
  ${PlaceIcon}:hover &{
    display: inline;
    font-size: ${({theme}) => theme.fontSize.font_12};
  }
`
const CopyBtn = styled.span`
  margin: 0px 6px;
  color: ${({theme}) => theme.colors.core};
  font-size: ${({theme}) => theme.fontSize.font_12};
  cursor: pointer;
`
const SplitHoriz = styled.hr`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
`
const Matchadditional = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`
const MatchDesc = styled.div`
  width: 240px;
  padding: 10px 0px;
  background-color: ${({theme}) => theme.colors.background_light};
  border-radius: 1rem;
  filter: drop-shadow(0px 0px 0px ${({theme}) => theme.colors.gray});
  &:hover{
    filter: drop-shadow(4px 2px 1px ${({theme}) => theme.colors.gray});
    transition: all 0.4s ease-in-out;
  }
`
const MatchDescContent = styled.p`
  font-size: ${({theme}) => theme.fontSize.font_14};
  padding: 0px 20px;
  line-height: 20px;
`
const MatchContact = styled.div`
  width: 100%;
  display: flex;
`
const MatchIntake = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`
const MatchIntakeNum = styled.span`
  margin-left: 10px;
  color: ${({isFull, theme}) => isFull ? theme.colors.black : theme.colors.gray};
`