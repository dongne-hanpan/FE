import React from 'react';
import { useDispatch } from 'react-redux';
import { clearAll} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialDenyExist = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearAll());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>๐ซ ์ด๋ฏธ ์ญ์ ๋ ๋ชจ์ง์๋๋ค ๐ซ</DialMessageTitle>
        <DialMessageExtra>์๋ก๊ณ ์นจ์ ๋๋ฌ์ฃผ์ธ์</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'ํ์ธ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialDenyExist;