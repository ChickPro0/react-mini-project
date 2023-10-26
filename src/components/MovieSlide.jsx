import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';

const MovieSlide = ({movies, type}) => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  

  const poster = () => {
    const arr = movies.results
    return arr.map((item, index) => {
      const src = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movies.results[index].poster_path}`;
      return (
        <MovieCard src={src} movies={movies.results[index]} type={type}></MovieCard>
      )
    })
  }
  

  return (
    <div>
      <Carousel responsive={responsive}>
        {poster()}
      </Carousel>
    </div>
  )
}

export default MovieSlide