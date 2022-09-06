import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/univ/Header';
import IndexPage from './pages/IndexPage'
import MyPage from './pages/MyPage';
import SportsPage from './pages/SportsPage';
import ChatPage from './pages/ChatPage';
import ModalTemplate from './components/y_modal/ModalTemplate';
import DialTemplate from './components/y_dialogue/DialTemplate';


function App() {
  const modalData = useSelector((state) => state.modal.modalData);
  const dialogueData = useSelector((state) => state.modal.dialogueData);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/:sports' element={<SportsPage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
        {modalData.modalType ? <ModalTemplate />:<></>}
        {dialogueData.dialType ? <DialTemplate />:<></>}
      </Router>
    </div>
  );
}

export default App;
