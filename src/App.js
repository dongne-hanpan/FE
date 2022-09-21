import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/univ/Header';
import IndexPage from './pages/IndexPage'
import MyPage from './pages/MyPage';
import SportsPage from './pages/SportsPage';
import ChatPage from './pages/ChatPage';
import ModalTemplate from './components/modal/ModalTemplate';
import DialTemplate from './components/dialogue/DialTemplate';


function App() {
  const modalData = useSelector((state) => state.modal.modalData);
  const dialogueData = useSelector((state) => state.modal.dialogueData);
  console.log('재배포 완료_1');
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/chat/:match_id' element={<ChatPage />} />
          <Route path='/:region/:sports' element={<SportsPage />} />
        </Routes>
        {modalData.modalType ? <ModalTemplate />:<></>}
        {dialogueData.dialType ? <DialTemplate />:<></>}
      </Router>
    </div>
  );
}

export default App;
