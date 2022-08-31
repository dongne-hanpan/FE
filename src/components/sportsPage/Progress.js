import React from 'react';
import styled from 'styled-components';

const Progress = ({data}) => {
  // const bucket_list = useSelector((state) => state.bucket.list);
  // let count = 0;
  // bucket_list.map((each, i) => {
  //   if(each.completed){
  //     count ++
  //   }
  //   return null
  // })

  return(
    <ProgressBar>
      <Dot />
      <HighLight height={data + '%'}/>
      {/* <HighLight width={(count / bucket_list.length) * 100 + '%'}/> */}
    </ProgressBar>
  )
}


export default Progress;

const ProgressBar = styled.div`
  position: absolute;
  top: 54px;
  width: 12px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
  background-color: var(--color-orange-pale);
  z-index: -1;
`
const Dot = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  top: 8px;
  background-color: var(--color-red-light);
  border-radius: 40px;
  z-index: 2;
`
const HighLight = styled.div`
  width: 12px;
  height: ${({height}) => height};
  border-radius: 20px;
  background: var(--color-orange);
  transition: 1s width;
`