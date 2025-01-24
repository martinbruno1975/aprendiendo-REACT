import { useRef, useState, useMemo,useCallback } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  //el useMemo se utiliza para memorizar algun valor o funcion para no volver a calcularlo dependiendo de alguna dependencia
  //el useMemo y el useCallback son lo mismo solo que el useCallback esta pensado para las funciones y te simplifica el codigo. Por debajo utiliza el useMemo
  // utilizacion: useCallback( funcion que queres memorizar )

  //useMemo ----> para valores
  //useCallback -----> para funciones

  const getMovies = useCallback(async ({search}) => {
      if (search === previousSearch.current) return

      try {
        setloading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      }
      catch (e) {
        setError(e.message)
      }
      finally {
        // entra tanto en el try como en el catch
        setloading(false)
      }
  },[])
  
  const sortedMovies = useMemo(() => {
    return sort
      ? [... movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
  },[sort, movies]) 
    
    return { movies: sortedMovies, getMovies, loading }
  }
