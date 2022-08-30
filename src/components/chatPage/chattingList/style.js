import styled from "styled-components";

export const ChattingListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
export const MessageListWrapper = styled.div`
  /* background-color: red; */
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
  gap: 15px;
`;

export const ChattingInputWrapper = styled.div`
  margin-top: 30px;
  height: 150px;
  width: 100%;
  padding: 10px;
  border: 0.1px solid grey;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const InputBox = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  resize: none;
  :focus {
    outline: none;
    outline-color: ${(props) => props.theme.palette.blue};
  }
`;

export const SubmitButton = styled.button`
  width: 70px;
  height: 30px;
  padding: 3px;
  text-align: center;
  background-color: green;
  color: white;
  border-radius: 10px;
  border: none;
`;
