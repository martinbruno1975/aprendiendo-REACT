import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState } from 'react'
import { Header } from './components/Header.jsx'

function App() {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: 'All',
    minPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice && 
        (
          filters.category === 'All' ||
          product.category === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(products)

  return (
      <>
        <Header />
        <Products products={filteredProducts} />
      </>
  )
}

export default App
