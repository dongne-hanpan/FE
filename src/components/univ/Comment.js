import React from 'react';
import styled from 'styled-components';


const Comment = ({content}) => {
  return(
    <CommentComp>
      {content.writer}: {content.comment}
    </CommentComp>
  )
};

export default Comment;

const CommentComp = styled.section`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 10px 0px;
`