import './App.css';
import Popular from './Components/Popular.Component';
import { useGlobalContext } from './context/GlobalContext';

function App() {
  const global = useGlobalContext();
  console.log(global);
  return (
    <div className="App">
      <Popular/>
    </div>
  );
}

export default App;
