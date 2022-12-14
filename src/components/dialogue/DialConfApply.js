import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../shared/redux/modules/modalSlice';
import { clearAlermStatus } from '../../shared/redux/modules/alermSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialConfApply = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAlermStatus());
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>đ ė ė˛­ ėëŖ đ</DialMessageTitle>
        <DialMessageExtra>ė ė˛­ė´ ėëŊëëŠ´ ėąíë°Šė ė´ëëŠëë¤</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'íė¸'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialConfApply;