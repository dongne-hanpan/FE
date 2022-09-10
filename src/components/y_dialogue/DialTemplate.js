import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Deco from '../univ/Deco';
import DialConfRemove from './DialConfRemove';
import DialConfSignup from './DialConfSignup';
import DialConfWrite from './DialConfWrite';
import DialConfApply from './DialConfApply';
import DialConfLogin from './DialConfLogin';


const DialTemplate = () => {
  const dialData = useSelector((state) => state.modal.dialogueData);
  const dispatch = useDispatch();
  const nope = (e) => {
    console.log('bad behavier')
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
    }
  }

  return(
    <DialComp aria-label='dialToggle' onClick={nope}>
      <DialSection>
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