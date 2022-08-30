import React from 'react';
import styled from 'styled-components';


const ReuseProfile = ({size, imgSrc, clickEvent}) => {
  return(
    <ProfileComp onClick={clickEvent}>
      <img src={imgSrc} alt='profile' />
    </ProfileComp>
  )
};

export default ReuseProfile;


const ProfileComp = styled.button`
  width: ${(props) => props.size || 40}px;
  height: ${(props) => props.size || 40}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  border: none;
  outline: none;
  border-radius: 5rem;
  cursor: pointer;
  & img{
    width: ${(props) => props.size || 40}px;
    height: ${(props) => props.size || 40}px;
    border-radius: 5rem;
  }
`


