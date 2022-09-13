import { useEffect } from "react";
import useInput from "../../shared/hooks/useInput";
import { ChatAPI } from "../../shared/api";
import styled from "styled-components";


const ChannelCreator = ({ visible, closeModal, channels, setChannels }) => {
  const [matchName, matchNameHandler, setMatchName] = useInput();
  const [matchDate, matchDateHandler, setMatchDate] = useInput();
  const [description, descriptionHandler, setDescription] = useInput();

  const submitForm = {
    matchName: matchName,
    matchDate: matchDate,
    description: description,
  };
  const onSubmit = async () => {
    if (matchName === "" || matchDate === ""|| description === "") {
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
      setMatchName("");
      setMatchDate("");
      setDescription("");
      closeModal();
    }
  };
  useEffect(() => {
    // 모달 닫으면 값 초기화
    setMatchName("");
    setMatchDate("");
    setDescription("");
  }, [visible]);

  return (
    <ChannelCreatorWrapper>
      <TextBox>
        <Text fontSize={"24px"} fontWeight={"700"}>
          새로운 매치를 생성하세요
        </Text>
      </TextBox>
      <ChannelInputBox>
        <Text>매치 이름</Text>
        <ChannelInput
          type="text"
          value={matchName}
          onChange={matchNameHandler}
          placeholder={"매치 이름"}
        />
        <Text>날짜</Text>
        <ChannelInput
          type="text"
          value={matchDate}
          onChange={matchDateHandler}
          placeholder={"매치 날짜"}
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
        <SubmitButton onClick={onSubmit}>게시하기</SubmitButton>
      </ButtonBox>
    </ChannelCreatorWrapper>
  );
};


const ChannelCreatorWrapper = styled.div`
  /* height: 200px; */
  width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
  background-color: white;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
`;

const ChannelInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
`;
const ChannelInput = styled.input`
  width: 100%;
  height: 30px;
  :focus {
    outline-color: ${(props) => props.theme.palette.blue};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.blue};
  width: 80px;
  height: 40px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default ChannelCreator;