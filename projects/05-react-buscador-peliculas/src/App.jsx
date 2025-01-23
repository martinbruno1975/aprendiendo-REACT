import "./App.css";
import responseMovies from './mocks/with-results.json'
import noMovies from './mocks/no-results.json'
import { Movies } from "./components/Movies";

function App() {
  const movies = responseMovies.Search

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form">
          <input placeholder="Advenger, The Matrix, Star Wars ..." />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
