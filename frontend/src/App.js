//import logo from './logo.svg';
import './App.css';
import MapShow from './Map';
import LLM from './LLM';

export default function App() {
  return (
    <div className='flex gap-x-80'>
      <LLM />
      <MapShow />
    </div>
  );
}
  

//export default App;