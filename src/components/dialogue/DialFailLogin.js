import React from 'react';
import { useDispatch } from 'react-redux';
import { clearDialogue} from '../../shared/redux/modules/modalSlice';
import ReuseBtn from '../reusable/ReuseBtn';
import {
  DialMessages,
  DialMessageTitle,
  DialMessageExtra,
  DialBtns
} from '../../shared/css/dialogueStyle';


const DialFailLogin = () => {
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(clearDialogue());
  }
  return(
    <>
      <DialMessages>
        <DialMessageTitle>๐ซ ๋ก๊ทธ์ธ ์คํจ ๐ซ</DialMessageTitle>
        <DialMessageExtra>๋ก๊ทธ์ธ ์ ๋ณด๊ฐ ์ผ์นํ์ง ์์ต๋๋ค</DialMessageExtra>
      </DialMessages>
      <DialBtns>
        <ReuseBtn styleType={'stretch'} content={'ํ์ธ'} clickEvent={cancel} />
      </DialBtns>
    </>
  )
};

export default DialFailLogin;