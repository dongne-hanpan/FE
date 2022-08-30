import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/univ/Header';
import ChatPage from './pages/ChatPage';
import IndexPage from './pages/IndexPage'
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
