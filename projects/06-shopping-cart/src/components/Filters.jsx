import { useState } from 'react'
import  './Filters.css'

export function Filters () {
    const [minPrice, setMinPrice] = useState(0)

    const handleRangeChange = (e) => {
        setMinPrice(e.target.value)
        console.log(minPrice)
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Price</label>
                <input 
                    type="range" 
                    id="price"
                    min='0'
                    max='1000'
                    onChange={handleRangeChange}
                />
                <span>{minPrice}</span>
            </div>
            <div>
                <label htmlFor="category">Categoria</label>
                <select id="category">
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