import React from 'react';
import './index.css';
import Navigation from './Navigation';
import CodecSelector from './CodecSelector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyResults from './MyResults';
import GlobalResults from './GlobalResults';
import Login from './Login';
import Signup from './Signup';
import ABX from './ABX';
import TestResults from './TestResults';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
      
      <Routes>
        <Route path="/" element={<><Navigation /> <CodecSelector/></>} />
        <Route path="/my-results" element={<MyResults/>} />
        <Route path="/global-results" element={<GlobalResults/>} />
        <Route path="/results" element={<TestResults/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/abx" element={<ABX/>}/>
      </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
