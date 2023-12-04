import React from 'react';
import './index.css';
import Navigation from './Navigation';
import SetupSelector from './SetupSelector';
import CodecSelector from './CodecSelector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyResults from './MyResults';
import GlobalResults from './GlobalResults';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
      
      <Routes>
        <Route path="/" element={<><Navigation /> <SetupSelector /> <CodecSelector/></>} />
        <Route path="my-results" element={<MyResults/>} />
        <Route path="global-results" element={<GlobalResults/>} />
        <Route path="/login" element ={<Login/>}/>
      </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
