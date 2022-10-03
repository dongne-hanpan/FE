import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { postWithoutCookie } from '../../shared/axios/axios';
import Comment from '../univ/Comment';


const CommentWatch = () => {
  const userData = useSelector((state) => state.user.userData);
  const [commentList, setCommentList] = useState([]);
  const getComments = async() => {
    if(userData.nickname !== undefined){
      const nicknameData = {nickname: userData.nickname}
      const res = await postWithoutCookie('/api/user/show-comment',nicknameData);
      setCommentList(res);
    }
  }
  useEffect(() => {
    getComments();
  },[]);

  return(
    <CommentWatchComp>
      {commentList.length > 0 ?
        commentList.map((each,idx) => 
          <Comment key={idx} bdgType={'sports'} content={each} />
        ):<div>후기가 없습니다.</div>
      }
    </CommentWatchComp>
  )
};

export default CommentWatch;

const CommentWatchComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`