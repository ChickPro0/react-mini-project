import React from 'react'
import { Link } from 'react-router-dom';

const Banner = ({movie, type}) => {
  
  const src = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path}`;
  
  return (
    <Link to={`/movies/${movie.id}?type=${type}`}>
      <div className='banner-image' style={{backgroundImage : 'url(' + src + ')'}}>
          <div className='banner-item'>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
      </div>
    </Link>
  )
}

export default Banner