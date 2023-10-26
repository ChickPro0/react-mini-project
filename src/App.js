import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetail from './pages/MovieDetail';

function App() {
  // Movie API : TMDB에서 가져오면 좋음

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/movies/:id' element={<MovieDetail></MovieDetail>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
      </Routes>
    </div>
  );
}

export default App;