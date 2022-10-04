import React from 'react';
import styled from 'styled-components';

import profile from '../../asset/defaultprofile.png';

const ReuseProfile = ({direc, imgSize, imgSrc, clickEvent, content, contentSize}) => {
  return(
    <ProfileComp direc={direc} onClick={clickEvent}>
      <Profile imgSize={imgSize} src={imgSrc ? imgSrc : profile} alt='profile' loading='lazy'/>
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
  margin-right: ${({direc}) => direc === 'horiz' ? 8:0}px;
  margin-bottom: ${({direc}) => direc === 'vertic' ? 6:0}px;
`
const Profile = styled.img`
  border-radius: 10rem;
  width: ${({imgSize}) => imgSize ? imgSize : 40}px;
  height: ${({imgSize}) => imgSize ? imgSize : 40}px;
`
const ProfileContent = styled.div`
  margin-top: ${({contentSize, theme}) => contentSize ? (contentSize - parseInt(contentSize/3)) : 4}px;
  font-size: ${({contentSize, theme}) => contentSize ? contentSize+'px' : theme.fontSize.font_12};
  font-weight: ${({contentSize, theme}) => contentSize ? theme.fontWeight.bold : theme.fontWeight.medium};
`