import styled from 'styled-components';

export const DialMessages = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const DialMessageTitle = styled.div`
  margin-bottom: 12px;
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
export const DialMessageExtra = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_16};
  font-weight: ${({theme}) => theme.fontWeight.light};
`
export const DialBtns = styled.div`
  width: 100%;
  height: 50px;
`
export const DialBtnsTwo = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
`