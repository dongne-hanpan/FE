import React from 'react';
import { useDispatch } from 'react-redux';
import {clearAll} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyFileUpload = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>🚫 업로드 실패 (크기 초과) 🚫</DialMessageTitle>
        <DialMessageExtra>128mb 이하의 이미지 파일만 가능합니다</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'확인'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyFileUpload;