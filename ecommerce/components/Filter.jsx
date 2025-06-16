"use client";

import { useState } from "react";

export default function Filter({ onFilterChange }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleFilterChange() {
    onFilterChange({ category, minPrice, maxPrice });
  }

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Category"
        className="border px-4 py-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        className="border px-4 py-2 rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border px-4 py-2 rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button
        onClick={handleFilterChange}
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
}
