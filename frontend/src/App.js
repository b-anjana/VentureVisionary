import React, { useState } from 'react';
import './App.css';
import Background from './Background';
import Design from './Design';
// import MapShow from './Map';
// import LLM from './LLM';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    console.log('Toggle dark mode');
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Background />
      {/* <LLM />
      <MapShow /> */}
      <Design darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;