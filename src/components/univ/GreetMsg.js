import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const GreetMsg = ({clickEvent}) => {
  const userData = useSelector((state) => state.user.userData);

  return(
    <UserGreetNormal onClick={clickEvent}>
      {userData.nickname ? 
        <><UserName>{userData.nickname}</UserName> 님 안녕하세요</>
      :'로그인 해주세요'}
    </UserGreetNormal>
  )
};

export default React.memo(GreetMsg);


const UserGreetNormal = styled.div`
  margin-right: 10px;
  color: ${({theme}) => theme.colors.background};
  font-weight: ${({theme}) => theme.fontWeight.light};
  cursor: pointer;
`
const UserName = styled.span`
  font-weight: ${({theme}) => theme.fontWeight.medium};
`