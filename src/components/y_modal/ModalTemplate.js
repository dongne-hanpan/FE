import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearModal, setDialogue } from '../../shared/redux_d/modules/modalSlice';
import ReuseBtn from '../y_reusable/ReuseBtn';
import Deco from '../univ/Deco';
import Login from '../y_login/Login';
import Signup from '../y_login/Signup';
import MatchWrite from './MatchWrite';
import MatchWatch from './MatchWatch';
import MatchResult from './MatchResult';
import UserWatch from './UserWatch';


const ModalTemplate = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modal.modalData);
  const removeModal = (e) => {
    if(e.target.ariaLabel === 'modalToggle'){
      if(modalData.modalType === 'matchWrite' || modalData.modalType === 'matchResult'){
        dispatch(setDialogue({dialType: 'confirmRemove'}));
      } else{
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
    } else if(modalData.modalType === 'userWatch'){
      return <UserWatch />
    }
  }

  return(
    <ModalComp aria-label='modalToggle' onClick={removeModal}>
      <ModalOutBtn>
        <ReuseBtn name={'modalToggle'} styleType={'shrink'} content={'X'} clickEvent={removeModal} />
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
`
const ModalOutBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
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