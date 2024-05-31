import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popular from './Components/Popular.Component';
import AnimeItem from './Components/Anime.Component';
import HomePage from './Components/HomePage.Component';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/anime/:id' element={<AnimeItem/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
