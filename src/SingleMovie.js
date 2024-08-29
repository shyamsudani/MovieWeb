import React from 'react'
import { NavLink, useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import { API_URL } from './Context';

const SingleMovie = () => {

  const { id } = useParams();

  const [isLoading, setISLoading] = useState(true);
  const [movie , setMovie] = useState("")

  const getMovies = async (url) => {
    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True"){
        setISLoading(false);
        setMovie(data);
      }
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    } , 800)

    return () => clearTimeout(timeout);
  }, [id]);

  if(isLoading){
    return(
      <div>
        <div className="loading">
          Loading...
        </div>
      </div>
    )
  }
  
  return (
    <>

    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating}</p>
          <p className="card-text">{movie.Country}</p>
          <p className="card-text">{movie.Language}</p>
          <p className="card-text">{movie.Actors}</p>
          <NavLink to="/" className="back-btn">Go Back</NavLink>
        </div>
      </div>
    </section>
    </>
  )
}

export default SingleMovie;
