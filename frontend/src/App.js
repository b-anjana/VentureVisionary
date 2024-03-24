import React, { useState } from 'react';
import './App.css';
import Background from './Background';
import Design from './Design';
import MapShow from './Map';
import LLM from './LLM';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    console.log('Toggle dark mode');
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    // <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
    <div className='relative'>
      <Design className='absolute z-10' darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className='absolute inset-0 z-20 gap-x-80 mr-6 flex justify-center items-center'>
        <div className='w-1/2'>
          <Background className="w-full" /> 
        </div>
        <MapShow className="w-2/5 ml-96" /> 
      </div>

    </div>
    // <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
    //   <Background />
    //   <LLM />
    //   <MapShow />
    //   <Design darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    // </div>
  );
}

export default App;