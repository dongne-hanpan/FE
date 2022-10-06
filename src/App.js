import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/univ/Header';
import IndexPage from './pages/IndexPage'
import Loading from './components/univ/Loading';
import ModalTemplate from './components/modal/ModalTemplate';
import DialTemplate from './components/dialogue/DialTemplate';
import ErrorBoundary from './shared/ErrorBoundary';
//로딩 지연
const SportsPage = lazy(() => import('./pages/SportsPage'));
const KakaoRedirect = lazy(() => import('./components/login/KakaoRedirect'));
const MyPage = lazy(() => import('./pages/MyPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));


function App() {
  const modalData = useSelector((state) => state.modal.modalData);
  const dialogueData = useSelector((state) => state.modal.dialogueData);
  
  return (
    <div className="App">
      <Router>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<Loading size={40} />}>
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
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
