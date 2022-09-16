import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Deco from '../univ/Deco';
import DialConfRemove from './DialConfRemove';
import DialConfSignup from './DialConfSignup';
import DialConfWrite from './DialConfWrite';
import DialConfApply from './DialConfApply';
import DialConfLogin from './DialConfLogin';
import { clearAll, clearDialogue } from '../../shared/redux_d/modules/modalSlice';
import DialConfResult from './DialConfResult';
import DialDenyResult from './DialDenyResult';
import DialReserveWho from './DialReserveWho';


const DialTemplate = () => {
  const dialData = useSelector((state) => state.modal.dialogueData);
  const dispatch = useDispatch();
  const removeDial = (e) => {
    if(e.target.ariaLabel === 'dialToggle'){
      if(dialData.dialType !== 'confirmRemove'){
        if(dialData.dialType === 'confirmWrite' || dialData.dialType === 'confirmResult'){
          dispatch(clearAll());
        } else{
          dispatch(clearDialogue());
        }
      }
    }
  }

  const dialRouter = () => {
    if(dialData.dialType === 'confirmRemove'){
      return <DialConfRemove />
    } else if(dialData.dialType === 'confirmSignup'){
      return <DialConfSignup />
    } else if(dialData.dialType === 'confirmLogin'){
      return <DialConfLogin />
    } else if(dialData.dialType === 'confirmWrite'){
      return <DialConfWrite />
    } else if(dialData.dialType === 'confirmApply'){
      return <DialConfApply />
    } else if(dialData.dialType === 'confirmResult'){
      return <DialConfResult />
    } else if(dialData.dialType === 'denyResult'){
      return <DialDenyResult />
    } else if(dialData.dialType === 'reserveWho'){
      return <DialReserveWho />
    }
  }

  return(
    <DialComp aria-label='dialToggle' onClick={removeDial}>
      <DialSection aria-label='dialTemplate'>
        <Deco />
        {dialRouter()}
      </DialSection>
    </DialComp>
  )
};

export default DialTemplate;


const DialComp = styled.div`
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
const DialOutBtn = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
`
const DialSection = styled.div`
  position: relative;
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 1rem;
  background-color: ${({theme}) => theme.colors.background};
`