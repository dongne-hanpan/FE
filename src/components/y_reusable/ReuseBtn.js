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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-weight: 500;
  ${({styleType}) => {
    if(styleType === 'stretch'){
      return css`
      width: 100%;
      height: 40px;
      background-color: var(--color-skyblue);
      &:hover{
        background-color: var(--color-core);
        color: var(--color-background);
        font-weight: 700;
        transition: all 0.2s ease-in-out;
      }
      `
    } else if(styleType === 'done'){
      return css`
      height: 26px;
      padding: 0px 12px;
      color: var(--color-darkgray);
      background-color: var(--color-gray);
      `
    } else{
      return css`
      height: 26px;
      padding: 0px 12px;
      background-color: var(--color-skyblue);
      &:hover{
        background-color: var(--color-core);
        color: var(--color-background);
        font-weight: 700;
        transform: scale(1.1);
        transition: all 0.2s ease-in-out;
      }
      `
    }
  }}
`



