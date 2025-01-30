import { useContext } from "react";
import { filtersContext } from "../context/filters";

export function useFilters() {
    const {filters, setFilters} = useContext(filtersContext) 
  
    const filterProducts = (products) => {
      return products.filter((product) => {
        return (
          product.price >= filters.minPrice &&
          (filters.category === "All" || product.category === filters.category)
        );
      });
    };
  
    return { filters, filterProducts, setFilters}
  }