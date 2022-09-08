import React from 'react';
import styled,{ css } from 'styled-components';


const ReuseProfile = ({direc, imgSize, imgSrc, clickEvent, content, contentSize}) => {
  return(
    <ProfileComp direc={direc} imgSize={imgSize} onClick={clickEvent}>
      <img src={imgSrc} alt='profile' />
      {content ? 
      <ProfileContent contentSize={contentSize}>{content}</ProfileContent>
      : <></>
      }
    </ProfileComp>
  )
};

export default ReuseProfile;


const ProfileComp = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  ${({direc}) => {
    if(direc === 'horiz'){
      return css`
      margin-right: 8px;
      `
    } else if(direc === 'vertic'){
      return css`
      margin-bottom: 6px;
      `
    }
  }}
  & img{
    border-radius: 5rem;
    ${({imgSize}) =>
    imgSize ? 
    css`
    width: ${imgSize}px;
    height: ${imgSize}px;
    `:
    css`
      width: 40px;
      height: 40px;
    `
    }
  }
`

const ProfileContent = styled.div`
  ${({contentSize, theme}) => contentSize ? 
  css`
    margin-top: 20px;
    font-size: ${contentSize};
    font-weight: ${theme.fontWeight.bold};
  `:
  css`
    margin-top: 4px;
    font-size: ${theme.fontSize.font_12};
    font-weight: ${theme.fontWeight.medium};
  `
  }
`