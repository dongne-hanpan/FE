import { useEffect } from "react";
import useInput from "../../../shared/redux_j/hooks/useInput";
import { ChatAPI } from "../../../shared/redux_j/api";

import {
  ChannelCreatorWrapper,
  ButtonBox,
  ChannelInput,
  ChannelInputBox,
  SubmitButton,
  Text,
  TextBox,
} from "./style";

const ChannelCreator = ({ visible, closeModal, channels, setChannels }) => {
  const [channelName, channelNameHandler, setChannelName] = useInput();
  const [description, descriptionHandler, setDescription] = useInput();

  const submitForm = {
    channelName: channelName,
    description: description,
  };
  const onSubmit = async () => {
    if (channelName === "" || description === "") {
      alert("빈칸없이 작성해주세요");
      return;
    } else {
      // API [POST] api/channel
      ChatAPI.addChatRoom(submitForm)
        .then((res) => {
          console.log("채널 추가 ", res.data);
          setChannels([...channels, res.data]);
          // props로 state 관리
        })
        .catch((error) => {
          console.log("채널생성 실패", error);
        });
      setChannelName("");
      setDescription("");
      closeModal();
    }
  };
  useEffect(() => {
    // 모달 닫으면 값 초기화
    setChannelName("");
    setDescription("");
  }, [visible]);

  return (
    <ChannelCreatorWrapper>
      <TextBox>
        <Text fontSize={"24px"} fontWeight={"700"}>
          새 채널을 생성하세요
        </Text>
      </TextBox>
      <ChannelInputBox>
        <Text>채널 이름</Text>
        <ChannelInput
          type="text"
          value={channelName}
          onChange={channelNameHandler}
          placeholder={"채널이름"}
        />
        <Text>채널 설명</Text>
        <ChannelInput
          type="text"
          value={description}
          onChange={descriptionHandler}
          placeholder={"간단한 채널 소개"}
        />
      </ChannelInputBox>
      <ButtonBox>
        <SubmitButton onClick={onSubmit}>생성</SubmitButton>
      </ButtonBox>
    </ChannelCreatorWrapper>
  );
};

export default ChannelCreator;
