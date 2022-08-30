import { useParams } from "react-router";
import styled from "styled-components";
import ChannelHeader from "../components/chatPage/channelHeader";
import ChannelList from "../components/chatPage/channelList";
import ChattingList from "../components/chatPage/chattingList";
import UserList from "../components/chatPage/userList";

const ChatPage = () => {
  const params = useParams().channel_id;
  return (
    <MainPageWrapper>
      {/* <ChannelHeader></ChannelHeader> */}
      <BodyWrapper>
        <MenuWrapper>
          <ChannelList />
          {params ? <UserList /> : null}
        </MenuWrapper>
        {params ? (
          <ChattingWrapper>
            <ChattingList></ChattingList>
          </ChattingWrapper>
        ) : null}
      </BodyWrapper>
    </MainPageWrapper>
  );
};

export default ChatPage;

const MainPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;
const MenuWrapper = styled.div`
  width: 350px;
  height: 100%;
  border-right: 0.1px solid grey;
  display: flex;
  background-color: ${(props) => props.theme.palette.blue};
`;
const ChattingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* background-color: white; */
`;
