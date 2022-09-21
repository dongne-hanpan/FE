import React from 'react';
import styled from 'styled-components';
import ReuseInput from '../reusable/ReuseInput';
import ReuseTextarea from '../reusable/ReuseTextarea';


const Result = ({data}) => {
  return(
    <>
      <Sep> - - - - - - - - - - -  {data.nickname} 후기 입력  - - - - - - - - - - -</Sep>
      <InputTitleBox>
        <InputTitle>{data.nickname} 님과의 매치는 어땠나요?</InputTitle>
      </InputTitleBox>
      <ReuseTextarea injClass={"review"} height={90} placeholderValue={`${data.nickname}님과의 매치 후기를 남겨주세요`} />
      <InputTitleBox>
        <InputTitle>{data.nickname} 님의 매너는 어땠나요?</InputTitle>
      </InputTitleBox>
      <ReuseInput injClass={"manner"} injType={'number'} placeholderValue={'10점 만점 (숫자 만 표기) '} />
    </>
  );
};

export default Result;

const Sep = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  overflow: hidden;
`
const InputTitleBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`
const InputTitle = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`