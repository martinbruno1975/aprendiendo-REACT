import "./App.css";
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";

export function App() {
  const { fact, refreshFact } =  useCatFact()
  const { imageId } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageId && (
          <img
            src={imageId}
            alt={`imagen extraida de usando trheeFirstWord para ${fact}`}
          />
        )}
      </section>
    </main>
  );
}
