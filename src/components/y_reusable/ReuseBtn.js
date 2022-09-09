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
  font-weight: ${({theme}) => theme.fontWeight.medium};
  ${({styleType, theme}) => {
    if(styleType === 'stretch'){
      return css`
      width: 100%;
      height: 40px;
      background-color: ${theme.colors.skyblue};
      &:hover{
        background-color: ${theme.colors.core};
        color: ${theme.colors.background};
        font-weight: ${theme.fontWeight.bold};
        transition: all 0.2s ease-in-out;
      }
      `
    }else if(styleType === 'shrink'){
      return css`
      height: 26px;
      padding: 0px 12px;
      background-color: ${theme.colors.skyblue};
      &:hover{
        background-color: ${theme.colors.core};
        color: ${theme.colors.background};
        font-weight: ${theme.fontWeight.bold};
        transform: scale(1.1);
        transition: all 0.2s ease-in-out;
      }
      `
    } else if(styleType === 'done'){
      return css`
      height: 26px;
      padding: 0px 12px;
      color: ${theme.colors.darkgray};
      background-color: ${theme.colors.gray};
      `
    }else if(styleType === 'danger'){
      return css`
      height: 40px;
      width: 120px;
      background-color: ${theme.colors.background};
      border: 2px solid ${theme.colors.red_pale};
      &:hover{
        color: ${theme.colors.background};
        background-color: ${theme.colors.red_light};
        font-weight: ${theme.fontWeight.bold};
        transition: all 0.2s ease-in-out;
      }
      `
    }else if(styleType === 'normal'){
      return css`
      height: 40px;
      width: 120px;
      background-color: ${theme.colors.background};
      border: 2px solid ${theme.colors.skyblue};
      &:hover{
        background-color: ${theme.colors.core};
        color: ${theme.colors.background};
        font-weight: ${theme.fontWeight.bold};
        transition: all 0.2s ease-in-out;
      }
      `
    }
  }}
  `