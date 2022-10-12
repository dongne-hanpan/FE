import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setModal } from '../../shared/redux/modules/modalSlice';


const SwitchLoginSignup = ({presentComp}) => {
  const dispatch = useDispatch();

  const moveBetweenLoginSignup = () => {
    if(presentComp === 'login'){
      dispatch(setModal({modalType: 'signup'}))
    } else{
      dispatch(setModal({modalType: 'login'}))
    }
  }

  return(
    <SwitchToLogin>
      {presentComp === 'login' ? '아직 회원이 아니신가요?' : '이미 회원이신가요?'}
      <SwitchToLoginLink onClick={moveBetweenLoginSignup}>
        {presentComp === 'login' ? '회원가입 하기' : '로그인하기'}
      </SwitchToLoginLink>
    </SwitchToLogin>
  )
};

export default React.memo(SwitchLoginSignup); 


const SwitchToLogin = styled.div`
  margin-top: 26px;
  font-size: ${({theme}) => theme.fontSize.font_14};
`
const SwitchToLoginLink = styled.span`
  margin-left: 4px;
  color: ${({theme}) => theme.colors.core};
  cursor: pointer;
`
