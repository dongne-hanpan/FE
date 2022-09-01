import React from 'react';
import styled,{ css } from 'styled-components';


const ReuseProfile = ({imgSize, imgSrc, clickEvent, content, contentSize}) => {
  return(
    <ProfileComp imgSize={imgSize} onClick={clickEvent}>
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
  min-width: 40px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  & img{
    border-radius: 5rem;
    ${({imgSize}) =>
    imgSize ? 
    css`
      width: ${imgSize}px;
      height: ${imgSize}px;
      margin-bottom: 20px;
      `:
      css`
        width: 40px;
        height: 40px;
        margin-bottom: 4px;
      `
    }
  }
`

const ProfileContent = styled.div`
  ${({contentSize}) => contentSize ? 
  css`
    font-size: ${contentSize};
    font-weight: 700;
  `:
  css`
    font-size: var(--font-12);
    font-weight: 500;
  `
  }
`