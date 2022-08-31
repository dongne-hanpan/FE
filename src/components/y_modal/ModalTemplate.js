import React from 'react';
import styled from 'styled-components';
import Login from '../y_login/Login';
import Signup from '../y_login/Signup';
import ReuseBtn from '../y_reusable/ReuseBtn';
import Deco from './Deco';


const ModalTemplate = () => {

  return(
    <ModalComp>
      <ModalOutBtn>
        <ReuseBtn content={'X'} />
      </ModalOutBtn>
      <ModalSection>
        <Deco />
        {/* <Signup /> */}
        <Login />
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
  background-color: var(--color-dark);
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
  background-color: var(--color-background);
`