import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='flex'>
        <div className="flex-1">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/task-manager" element={<TaskManager />} />  
          <Route path="/" element={<Navigate to="/task-manager" replace />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
