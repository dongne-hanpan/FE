import React from 'react';
import styled from 'styled-components';


const ReuseInput = ({injRef, injClass, injType, placeholderValue}) => {
  //데이터 값 들어오면 프론트에서 처리
  return(
    <InputComp
      ref={injRef}
      className={injClass}
      type={injType}
      placeholder={placeholderValue} 
      required
    />
  )
};

export default ReuseInput;

const InputComp = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px 20px;
  margin-bottom: 14px;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.colors.background_light}
`



