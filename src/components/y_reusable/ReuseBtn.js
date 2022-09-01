import React from 'react';
import styled, {css} from 'styled-components';


const ReuseBtn = ({styleType, content, clickEvent}) => {
  return(
    <BtnComp styleType={styleType} onClick={clickEvent}>
      {content}
    </BtnComp>
  )
};

export default ReuseBtn;

const BtnComp = styled.button`
  ${({styleType}) => styleType === 'stretch' ? 
    css`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-skyblue);
    border-radius: 0.5rem;
    font-weight: 500;
    &:hover{
      background-color: var(--color-core);
      color: var(--color-background);
      font-weight: 700;
      transition: all 0.2s ease-in-out;
    }
    `:css`
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
  }

`



