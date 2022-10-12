import React from 'react';
import styled from 'styled-components';
import ReuseTitle from '../reusable/ReuseTitle';
import ReuseBtn from '../reusable/ReuseBtn';


const ReuseTitleBox = ({withBtn, btnClickEvent, titleContent, titleRef, titleStatus}) => {

  return(
    <InputTitleBox>
      <ReuseTitle injContent={titleContent} injErrRef={titleRef} injErrStatus={titleStatus} />
      {withBtn ? 
        <ReuseBtn styleType={'shrink'} content={'중복체크'} clickEvent={btnClickEvent} />
        :<></>
      }
    </InputTitleBox>
  )
};

export default React.memo(ReuseTitleBox);

const InputTitleBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
