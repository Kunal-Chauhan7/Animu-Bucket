import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popular from './Components/Popular.Component';
import AnimeItem from './Components/Anime.Component';
import HomePage from './Components/HomePage.Component';
import Gallery from './Components/Gallery.Component';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/anime/:id' element={<AnimeItem/>}/>
      <Route path='/character/:id' element={<Gallery/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
