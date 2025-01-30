import { useId, useState } from 'react'
import  './Filters.css'

export function Filters ({onChange}) {
    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleRangeChange = (e) => {
        setMinPrice(e.target.value)
        onChange(prevState => ({
            ... prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        onChange(prevState => ({
            ... prevState,
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Price</label>
                <input 
                    type="range" 
                    id={minPriceFilterId}
                    min='0'
                    max='1000'
                    onChange={handleRangeChange}
                />
                <span>{minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="All">Todas</option>
                    <option value="fragrances">Fragancias</option>
                    <option value="beauty">Belleza</option>
                    <option value="groceries">Comestibles</option>
                    <option value="furniture">Muebles</option>
                </select>
            </div>
        </section>
    )
}