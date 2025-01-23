import { useEffect, useState } from "react";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com/cat/says/"

//custom hook
export function useCatImage({ fact }) {
  const [imageId, setImageId] = useState();

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
  }, [fact])

  return { imageId:`${CAT_PREFIX_IMAGE_URL}${imageId}` }
}