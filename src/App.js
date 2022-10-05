import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/univ/Header';
import IndexPage from './pages/IndexPage'
import Loading from './components/univ/Loading';


const KakaoRedirect = lazy(() => import('./components/login/KakaoRedirect'));
const MyPage = lazy(() => import('./pages/MyPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const SportsPage = lazy(() => import('./pages/SportsPage'));
const ModalTemplate = lazy(() => import('./components/modal/ModalTemplate'));
const DialTemplate = lazy(() => import('./components/dialogue/DialTemplate'));


function App() {
  const modalData = useSelector((state) => state.modal.modalData);
  const dialogueData = useSelector((state) => state.modal.dialogueData);
  
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading />}>
          <Header />
          <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path="/user/kakao/callback" element={<KakaoRedirect />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/chat/:match_id' element={<ChatPage />} />
            <Route path='/:region/:sports' element={<SportsPage />} />
          </Routes>
          {modalData.modalType ? <ModalTemplate />:<></>}
          {dialogueData.dialType ? <DialTemplate />:<></>}
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
