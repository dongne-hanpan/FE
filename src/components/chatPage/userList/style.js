import styled from "styled-components";

export const UserListWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const ChannelInfo = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 0.1px solid grey;
  color: white;
  font-size: 24px;
  font-weight: 600;
`;
export const UserContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  font-size: 18px;
  color: white;
`;

export const UserProfileImageBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  margin-right: 20px;
  background-color: white;
  cursor: pointer;
`;
export const UserProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;
export const PlusIconBox = styled(UserProfileImageBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0.3);
`;
export const PlusIcon = styled.div`
  font-size: 32px;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
`;
