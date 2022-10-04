import React from 'react';
import styled, { css } from 'styled-components';


function ChatNotice({injRef, data}) {
  const noticeRouter = () => {
    if(data.type === 'reserved'){
      return '모집 완료';
    } else if(data.type === 'enter'){
      return `${data.sender} 님이 입장했습니다`;
    } else if(data.type === 'result'){
      return `${data.sender}, 나의 결과 입력 완료`;
    } else if(data.type === 'leave'){
      return `${data.sender} 님이 퇴장했습니다`;
    } else if(data.type === 'done'){
      return `매치가 완료되었습니다`;
    }
  }

  return (
    <ChatNoticeComp ref={injRef}>
      <Notice type={data.type}>
        {noticeRouter()}
      </Notice>
    </ChatNoticeComp>
  );
}


export default ChatNotice;

const ChatNoticeComp = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0px;
  font-size: ${({theme}) => theme.fontSize.font_14};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const Notice = styled.div`
  width: 94%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${({theme}) => theme.colors.background_deep};
  ${({theme, type}) => {
    if(type === 'reserved'){
      return css`color: ${theme.colors.yellow};`
    } else if(type === 'enter'){
      return css`color: ${theme.colors.skyblue};`
    } else if(type === 'result'){
      return css`color: ${theme.colors.green_pale};`
    } else if(type === 'leave'){
      return css`color: ${theme.colors.red_pale};`
    } else if(type === 'done'){
      return css`color: ${theme.colors.gray};`
    }
  }}
`