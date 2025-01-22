import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [fact, setFact] = useState();
  const [imageId, setImageId] = useState();

  const API_URL_RANDOM_FACT = "https://catfact.ninja/fact";
  //const API_URL_IMAGE_RANDOM = `https://cataas.com/cat/says/${threeFirstWord}?json=true`
  const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/says/";

  //recupoera la cita al cargar la pagina
  useEffect(() => {
    fetch(API_URL_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  //recuperar la imagen cada vez que hay una cita nueva
  useEffect(() => {
    if (!fact) return

    const threeFirstWord = fact.split(" ", 3).join(" ");

    fetch(`https://cataas.com/cat/says/${threeFirstWord}?json=true`)
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        setImageId(_id);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageId && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}${imageId}`}
            alt={`imagen extraida de usando trheeFirstWord para ${fact}`}
          />
        )}
      </section>
    </main>
  );
}
