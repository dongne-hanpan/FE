import styled from "styled-components";

export const UserCreatorWrapper = styled.div`
  height: 200px;
  width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Text = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
`;

export const ChannelInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
`;
export const ChannelInput = styled.input`
  width: 100%;
  height: 30px;
  :focus {
    outline-color: ${(props) => props.theme.palette.purple};
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
`;

export const SubmitButton = styled.button`
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
