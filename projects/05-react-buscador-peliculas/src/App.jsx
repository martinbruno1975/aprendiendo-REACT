//import { useRef } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useState, useEffect, useRef } from "react";

function useSearch() {
  //forma controlada por react con un estado
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if (search==='') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/\d/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {search, setSearch, error}
}

function App() {
  const { movies } = useMovies()
  const {search, setSearch, error} = useSearch()

  //const inputRef = useRef() // el useRef persiste entre renders. La constante no cambia su valor cuando se vuelve a renderizar el componente

  // forma no controlada del form a traves del DOM
  const handleSubmit = (event) => {
    event.preventDefault()
    
    //const {query} = Object.fromEntries(new window.FormData(event.target)) 
    //const query = fields.get('query')
    console.log({search})

    //const value = inputRef.current.value
  }

  const handleChange = (event) => {
    if (event.target.value.startsWith(' ')) return
    setSearch(event.target.value)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{
            border:'1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }} 
          onChange={handleChange} value={search} name="query" placeholder="Advenger, The Matrix, Star Wars ..." />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
