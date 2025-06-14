// "use client";

// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";

// export default function HomePage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products");
//       if (!res.ok) throw new Error("Failed to fetch products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error loading products:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Featured Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "@/components/Filter";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.append("category", filters.category);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filters]);

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-6">
      <Filter onFilterChange={handleFilterChange} />
      <h1 className="text-3xl font-bold mb-4">Featured Products</h1>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}


