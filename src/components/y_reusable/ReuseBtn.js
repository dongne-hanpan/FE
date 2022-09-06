import React from 'react';
import styled, {css} from 'styled-components';


const ReuseBtn = ({name, direc, styleType, content, clickEvent}) => {
  if(styleType === undefined){
    console.log(content, 'styleType 설정하세요')
  }
  return(
    <BtnComp aria-label={name} direc={direc} styleType={styleType} onClick={clickEvent}>
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
    }else if(styleType === 'shrink'){
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
    } else if(styleType === 'done'){
      return css`
      height: 26px;
      padding: 0px 12px;
      color: var(--color-darkgray);
      background-color: var(--color-gray);
      `
    }else if(styleType === 'danger'){
      return css`
      height: 40px;
      width: 120px;
      background-color: var(--color-background);
      border: 2px solid var(--color-red-pale);
      &:hover{
        background-color: var(--color-red-light);
        color: var(--color-background);
        font-weight: 700;
        transition: all 0.2s ease-in-out;
      }
      `
    }else if(styleType === 'normal'){
      return css`
      height: 40px;
      width: 120px;
      background-color: var(--color-background);
      border: 2px solid var(--color-skyblue);
      &:hover{
        background-color: var(--color-core);
        color: var(--color-background);
        font-weight: 700;
        transition: all 0.2s ease-in-out;
      }
      `
    }
  }}

`



