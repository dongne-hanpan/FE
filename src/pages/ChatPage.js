import styled from "styled-components";
import UserList from "../components/chatPage/UserList";
import ChannelList from "../components/chatPage/ChannelList";
import ChattingList from "../components/chatPage/ChattingList";

const ChatPage = () => {
  const params = 1;
  return (
    <MainPageWrapper>
      <BodyWrapper>
        <MenuWrapper>
          <ChannelList />
          {params ? <UserList /> : null}
        </MenuWrapper>
        <ChattingWrapper>
          {params ? <ChattingList /> : null}
        </ChattingWrapper>
      </BodyWrapper>
    </MainPageWrapper>
  );
};

export default ChatPage;

const MainPageWrapper = styled.div`
  width: 830px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: "#0FFFCF1";
  position:relative;
  left:33%;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;
const MenuWrapper = styled.div`
  width: 320px;
  height: 100%;
  border-right: 0.1px solid grey;
  display: flex;
  background-color: "#8ACCE4";
`;
const ChattingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
