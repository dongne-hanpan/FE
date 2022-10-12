import React from 'react';
import styled from 'styled-components';


const ReuseTextarea = ({injRef, injClass, height, placeholderValue, onChageEvent, value}) => {
  return(
    <TextareaComp ref={injRef} className={injClass} height={height} placeholder={placeholderValue} value={value} onChange={onChageEvent} />
  )
};

export default React.memo(ReuseTextarea);

const TextareaComp = styled.textarea`
  width: 100%;
  height: ${({height}) => height || 80}px;
  padding: 12px 16px;
  margin-bottom: 14px;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.colors.background_light};
`
