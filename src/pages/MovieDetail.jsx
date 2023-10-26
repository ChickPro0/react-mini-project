import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from '../axios'

const MovieDetail = () => {

    // useParams
    // Route 작성 부분에 /:id <= path 작성
    const { id } = useParams()
    
    // useSearchParams
    // url을 작성하는 부분에 ?type=asvas
    const [searchParams] = useSearchParams()
    const type = searchParams.get('type')
    
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(state => state.movies);
    const [data, setData] = useState()
    const [review, setReview] = useState([])


    const getMovieData = ()=>{
        if (type === "popularMovies"){
           setData(popularMovies.results.find((item) => item.id == id))
        } else if (type==="topRatedMovies"){
           setData(topRatedMovies.results.find((item) => item.id == id))
        } else {
           setData(upComingMovies.results.find((item) => item.id == id))
        }
    }

    const getReviewData = () => {
        axios.get(`/${id}/reviews`).then((res) => {
            setReview(res.data.results)
            console.log(res.data.results)
        })
    }

    useEffect(()=>{
        const sessionMovie = JSON.parse(sessionStorage.getItem('data'))
        if (sessionMovie) {
            setData(sessionMovie)
        }
        else {
            getMovieData()
        }
    },[popularMovies.results,  
        topRatedMovies.result,
        upComingMovies.result,
        id,
        type
    ])

    useEffect(() => {
        if (data) {
            sessionStorage.setItem('data', JSON.stringify(data))
            getReviewData()
        }
    }, [data])



  return (
    <div className='movie-detail'>
        {data &&
            <div>
                <div className='detail-poster' 
                style={{backgroundImage : `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path})`}}></div>
                <div className='detail-text'>
                    <h1>{data.title}</h1>
                    <div>{data.adult === false?
                            <Badge bg="success">전체관람가</Badge>:
                            <Badge bg="danger">청소년관람불가</Badge>}
                    </div>
                    <span>평점 : {data.vote_average}</span>
                    <span>개봉일 : {data.release_date}</span>
                    <span>{data.overview}</span>
                </div>

                <hr />
                <h2>Review</h2>

                {
                    review.length > 0 ?
                    review.map((item) => {
                        return (
                            <div key={item.id}>
                                <hr />
                                <p>{item.content}</p>
                                <p>작성자 : {item.author} | 작성일 : {item.created_at.slice(0,10)}</p>
                            </div>
                        )
                    }) :
                    <p>등록된 리뷰가 없습니다!</p>
                }
            </div>
        }

    </div>
  )
}

export default MovieDetail