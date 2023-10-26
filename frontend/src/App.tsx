import React from 'react';
import './index.css';
import Navigation from './Navigation';
import SetupSelector from './SetupSelector';
import CodecSelector from './CodecSelector';

function App() {
  return (
    <div className="App">
      <Navigation />
      
      <SetupSelector />
      <CodecSelector />
    </div>
  );
}

export default App;
