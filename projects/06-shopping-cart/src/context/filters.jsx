import { createContext, useState } from "react";

// Paso 1: crear el contexto
// este el que tenemos que consumir
export const filtersContext = createContext()

// Paso 2: crear el provider para proveer el contexto
// este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState({
        category: 'All',
        minPrice: 0
    })

    return (
        <filtersContext.Provider value={{
            filters,
            setFilters
        }}>
            { children }
        </filtersContext.Provider>
    )
}

// Paso 3: envolver toda la App con FiltersProvider en main.jsx
// Paso 4: consumir el contexto donde sea necesario