
import React, { useEffect, useState } from "react";


export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
// we neef to create a context fun
const AppContext = React.createContext();

// We need to create a provider fun

const AppProvider = ({children}) => {

  const [isLoading, setISLoading] = useState(true);
  const [movie , setMovie] = useState([])
  const [isError, setIsError] = useState({ show: "false" , msg: ""});
  const [query, setQuery] = useState("titanic")

  const getMovies = async (url) => {
    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True"){
        setISLoading(false);
        setIsError({
          show: false,
          msg: ""
        })
        setMovie(data.Search);
      }
      else{
        setIsError({
          show: "true",
          msg: data.Error
        })
      }
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    } , 800)

    return () => clearTimeout(timeout);
  }, [query]);
  return (<AppContext.Provider value={{isLoading, isError,movie, setQuery}}>{children}</AppContext.Provider>);
  
}

export {AppContext,  AppProvider} ;