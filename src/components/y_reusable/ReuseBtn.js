import React from 'react';
import styled from 'styled-components';


const ReuseBtn = ({content, clickEvent}) => {
  return(
    <BtnComp onClick={clickEvent}>
      {content}
    </BtnComp>
  )
};

export default ReuseBtn;

const BtnComp = styled.button`
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  background-color: var(--color-skyblue);
  border-radius: 0.5rem;
  font-weight: 500;
  &:hover{
    background-color: var(--color-core);
    color: var(--color-background);
    font-weight: 700;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`



