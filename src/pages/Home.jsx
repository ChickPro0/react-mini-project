import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpComingMovies
} from '../redux/movieSlice'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import { ClipLoader } from 'react-spinners'


const Home = () => {

  useEffect(() => {

    sessionStorage.clear()

    const popularApi = axios.get('/popular?language=ko-KR&page=1')
    const topRatedApi = axios.get('/top_rated?language=ko-KR&page=1')
    const upComingApi = axios.get('/upcoming?language=ko-KR&page=1')

    // Promise.all을 사용하여 여러번의 API 요청을 병렬 처리
    Promise
    .all([popularApi, topRatedApi, upComingApi])
    .then((res) => {
        console.log(res)

        // API에서 받아온 데이터를 store 안에 넣고 싶음 : useDispatch
        dispatch(getPopularMovies(res[0].data))
        dispatch(getTopRatedMovies(res[1].data))
        dispatch(getUpComingMovies(res[2].data))

    }).then(()=>{
      setLoading(false)
    });

}, [])



  const dispatch = useDispatch()
  const {
    popularMovies, 
    topRatedMovies, 
    upComingMovies
  } = useSelector(state => state.movies)

  const [loading, setLoading] = useState(true);

    // store에 값이 잘 들어가 있는지 확인해보는 용도
    // useEffect(() => {
    //   console.log('store의 상태 :', popularMovies, topRatedMovies, upComingMovies)
    // }, [popularMovies, topRatedMovies, upComingMovies])

  if (loading) {
    return (
      <ClipLoader
      color = '#ffffff'
      loading = {loading}
      size={250}
      ></ClipLoader>
    )
  }
  return (
    <div>
        {
          popularMovies.results &&
          <Banner movie={popularMovies.results[3]} type={'popularMovies'}></Banner>
        }
        <div className='home-slide-container'>
          <p className='home-movielist-title'>Popular Movies</p>
          {
            popularMovies &&
            <MovieSlide movies={popularMovies} type={'popularMovies'}></MovieSlide>  
          }

          <p className='home-movielist-title'>TopRated Movies</p>
          {
            topRatedMovies &&
            <MovieSlide movies={topRatedMovies} type={'topRatedMovies'}></MovieSlide>  
          }

          <p className='home-movielist-title'>UpComing Movies</p>
          {
            upComingMovies &&
            <MovieSlide movies={upComingMovies} type={'upComingMovies'}></MovieSlide>  
          }
        </div>
    </div>
  )
}

export default Home