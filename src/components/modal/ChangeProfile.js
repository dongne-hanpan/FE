import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearModal, setDialogue } from '../../shared/redux/modules/modalSlice';
import { updateProfileThunk } from '../../shared/redux/modules/userSlice';
import ReuseBtn from '../reusable/ReuseBtn';


const ChangeProfile = () => {
  const dispatch = useDispatch();
  const inputFile = useRef();
  const [preview, setPreview] = useState(null);
  const [imgData, setImgData] = useState(null);

  const dropImg = (e) =>{
    e.preventDefault();
    const file = e.dataTransfer.files;
    const fileType = file[0].type;
    if(fileType === 'image/png' || fileType === 'image/jpeg'){
      setImgData(file[0]);
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if(base64){
          const base64Sub = base64.toString();
          setPreview(base64Sub);
        }
      }
    } else{
      dispatch(setDialogue({dialType: 'denyFileType'}));
    }
  };
  const dragOverImg = (e) =>{
    e.preventDefault();
  }
  const clickToLoad = () => {
    inputFile.current.click();
  }
  const inputImgChange = (e) => {
    const file = e.target.files;
    const fileType = file[0].type;
    if(fileType === 'image/png' || fileType === 'image/jpeg'){
      setImgData(file[0]);
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if(base64){
          const base64Sub = base64.toString();
          setPreview(base64Sub);
        }
      }
    } else{
      dispatch(setDialogue({dialType: 'denyFileType'}));
    }
  };

  const uploadProfile = () => {
    if(imgData !== null){
      let formData = new FormData();
      formData.append("image", imgData);
      dispatch(updateProfileThunk(formData));
      dispatch(clearModal());
    }
  };

  return(
    <ChangeProfileComp>
      <InputTitleBox>
        <InputTitle>프로필 사진 변경</InputTitle>
      </InputTitleBox>
        {preview ? 
          <PreviewImgBox onDrop={dropImg} onDragOver={dragOverImg}>
            <PreviewImg src={preview} alt="preview" loading='lazy' />
          </PreviewImgBox>
        :
          <DropImgBox onDrop={dropImg} onDragOver={dragOverImg}>사진과 동영상을 여기에 끌어다 놓으세요</DropImgBox>
        }
          <Btns>
            <ReuseBtn direc={'horiz'} styleType={'normal'} content={'컴퓨터에서 선택'} clickEvent={clickToLoad} />
            <ReuseBtn direc={'horiz'} styleType={'normal'} content={'변경하기'} clickEvent={uploadProfile} />
          </Btns>
          <InvisibleInput type="file" ref={inputFile} onChange={inputImgChange} />

    </ChangeProfileComp>
  )
};

export default ChangeProfile;

const ChangeProfileComp = styled.section`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`
const InputTitleBox = styled.div`
  width: 360px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`
const InputTitle = styled.div`
  font-size: ${({theme}) => theme.fontSize.font_18};
  font-weight: ${({theme}) => theme.fontWeight.medium};
`
const PreviewImgBox = styled.div`
  width: 360px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  overflow-y: hidden;
`
const PreviewImg = styled.img`
  width: 100%;
  object-fit: cover;
`
const DropImgBox = styled.div`
  width: 360px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed ${({theme}) => theme.colors.gray};
  margin-bottom: 30px;
`
const Btns = styled.div`
  display: flex;
`
const InvisibleInput = styled.input`
  visibility: hidden;
`