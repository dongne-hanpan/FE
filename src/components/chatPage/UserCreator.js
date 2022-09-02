import { useEffect } from "react";
import useInput from "../../shared/hooks/useInput";
import { ChatAPI } from "../../shared/api";
import styled from "styled-components";
import { useParams } from "react-router";

const UserCreator = ({ visible, closeModal, userData, setUserData }) => {
  const [username, usernameHandler, setUsername] = useInput();
  const params = useParams().channel_id;
  const submitForm = {
    channel_id: params, // Router연결 후 Params로 수정
    username: username,
  };
  const onSubmit = async () => {
    if (username === "") {
      alert("빈칸없이 작성해주세요");
      return;
    } else {
      // [POST] api/channel/invite
      ChatAPI.inviteUser(submitForm)
        .then((res) => {
          // console.log("유저 추가", res.data);
          setUserData([...userData, res.data]);
          // props로 state 관리
        })
        .catch((error) => {
          console.log("유저추가 실패", error);
        });
      setUsername("");
      closeModal();
    }
  };
  useEffect(() => {
    // 모달 닫으면 값 초기화
    setUsername("");
  }, [visible]);

  return (
    <UserCreatorWrapper>
      <TextBox>
        <Text fontSize={"24px"} fontWeight={"700"}>
          새로운 인원을 추가하세요
        </Text>
      </TextBox>
      <ChannelInputBox>
        <Text>추가할 이메일</Text>
        <ChannelInput
          type="text"
          value={username}
          onChange={usernameHandler}
          placeholder={"초대할 유저 이메일"}
        />
      </ChannelInputBox>
      <ButtonBox>
        <SubmitButton onClick={onSubmit}>추가</SubmitButton>
      </ButtonBox>
    </UserCreatorWrapper>
  );
};


const UserCreatorWrapper = styled.div`
  height: 200px;
  width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
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
    outline-color: ${(props) => props.theme.palette.purple};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.purple};
  width: 65px;
  height: 40px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;



export default UserCreator;
