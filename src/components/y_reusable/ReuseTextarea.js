import React from 'react';
import styled from 'styled-components';


const ReuseTextarea = ({height, placeholderValue}) => {
  return(
    <TextareaComp height={height} placeholder={placeholderValue} />
  )
};

export default ReuseTextarea;

const TextareaComp = styled.textarea`
  width: 100%;
  height: ${({height}) => height || 80}px;
  padding: 16px 20px;
  margin-bottom: 14px;
  border-radius: 0.5rem;
`
