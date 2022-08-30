import styled from "styled-components";

export const ChannelListWrapper = styled.section`
  width: 80px;
  height: 100%;
  padding-top: 10px;
  border-right: 0.1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ChannelIcon = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.dark_grey};
`;

export const PlusIcon = styled(ChannelIcon)`
  font-size: 32px;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
`;
