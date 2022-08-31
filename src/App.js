import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/univ/Header';
import IndexPage from './pages/IndexPage'
import Register from './pages/Register';
import SportsPage from './pages/SportsPage';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:sports' element={<SportsPage />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
