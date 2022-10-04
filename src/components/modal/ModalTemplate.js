import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearModal, setDialogue } from '../../shared/redux/modules/modalSlice';
import Deco from '../univ/Deco';
import Login from '../login/Login';
import Signup from '../login/Signup';
import MatchWrite from './MatchWrite';
import MatchWatch from './MatchWatch';
import MatchResult from './MatchResult';
import ChangeProfile from './ChangeProfile';
import MatchComment from './MatchComment';
import CommentWatch from './CommentWatch';
import UserWatch from './UserWatch';


const ModalTemplate = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modal.modalData);
  const removeModal = (e) => {
    if(e.target.ariaLabel === 'modalToggle'){
      if(modalData.modalType === 'matchWrite' || modalData.modalType === 'changeProfile'){
        dispatch(setDialogue({dialType: 'confirmRemove'}));
      } else if(modalData.modalType === 'matchResult' || modalData.modalType === 'matchComment' ){
        dispatch(setDialogue({dialType: 'confirmLeave'}));
      } else if(modalData.modalType === 'login' || modalData.modalType === 'signup'){
        dispatch(setDialogue({dialType: 'confirmLeave'}));
      }else{
        dispatch(clearModal());
      }
    }
  }

  const modalRouter = () => {
    if(modalData.modalType === 'login'){
      return <Login />
    } else if(modalData.modalType === 'signup'){
      return <Signup />
    } else if(modalData.modalType === 'matchWrite'){
      return <MatchWrite />
    } else if(modalData.modalType === 'matchWatch'){
      return <MatchWatch />
    } else if(modalData.modalType === 'matchResult'){
      return <MatchResult />
    } else if(modalData.modalType === 'matchComment'){
      return <MatchComment />
    } else if(modalData.modalType === 'userWatch'){
      return <UserWatch />
    } else if(modalData.modalType === 'commentWatch'){
      return <CommentWatch />
    } else if(modalData.modalType === 'changeProfile'){
      return <ChangeProfile />
    }
  }

  return(
    <ModalComp aria-label='modalToggle' onClick={removeModal}>
      <ModalOutBtn>
      <IconOut className="fa-regular fa-circle-xmark" aria-label="modalToggle" onClick={removeModal} />
      </ModalOutBtn>
      <ModalSection>
        <Deco />
        {modalRouter()}
      </ModalSection>
    </ModalComp>
  )
};

export default ModalTemplate;


const ModalComp = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.dark};
  z-index:2;
`
const ModalOutBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
`
const IconOut = styled.i`
  padding: 6px;
  color: ${({theme}) => theme.colors.green};
  font-size: ${({theme}) => theme.fontSize.font_32};
  cursor: pointer;
`
const ModalSection = styled.div`
  position: relative;
  width: 450px;
  height: 590px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background};
`