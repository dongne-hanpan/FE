import React from "react";
import styled from "styled-components";

function Modal({ visible, closeModal, children }) {
  return (
    <div className="Modal">
      <ModalContainer visible={visible}>{children}</ModalContainer>
      <ModalWrapper visible={visible} onClick={closeModal}></ModalWrapper>
    </div>
  );
}


const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px;
  /* width: 700px;
  height: 600px; */
  padding: 20px 0;
  z-index: 100;
  /* cursor: default; */
`;


export default Modal;

// [사용방법]

// 모달을 열고 닫을 수 있는 state와 모달 닫는 함수를 만들어 props로 전달
// const [modalToggel, setModlaToggle] = useState(false);
// const closeModal = () => {
//   setModlaToggle(false);
// };

// <div>
//   <Modal visible={modalToggel} closeModal={closeModal}>
//     여기에 원하는 태그 넣어서 사용
//   </Modal>
// </div>;
