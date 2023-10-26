import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MovieCard = ({src, movies, type}) => {
    const [mouse, setMouse] = useState(false)

  return (
    <div onMouseOver={()=>{setMouse(true)}} 
         onMouseLeave={() => {setMouse(false)}}>
        <Link to={`/movies/${movies.id}?type=${type}`}>
        {
            mouse === false ?
            <div className='slide-img' style={{backgroundImage : 'url(' + src + ')'}}></div>:
            <div className='slide-img slide-img-dark' style={{backgroundImage : 'url(' + src + ')'}}>
                <div>
                    <h1>{movies.title}</h1>
                    <p>평점 : {movies.vote_average} {
                        movies.adult === false?
                        <Badge bg="success">전체관람가</Badge>:
                        <Badge bg="danger">청소년관람불가</Badge>
                    }</p>
                </div>
            </div>
        }
        </Link>
    </div>
  )
}

export default MovieCard