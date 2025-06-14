"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    rating: 5,
  });
  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  async function addProduct() {
    if (!newProduct.name || !newProduct.category) return;

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Error adding product:", err);
      return;
    }

    const result = await res.json();
    console.log("Product added:", result);

    setNewProduct({
      name: "",
      image: "",
      price: "",
      category: "",
      rating: 5,
    });

    await fetchProducts();
  }

  async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  }

  function startEdit(product) {
    setEditingId(product.id);
    setEditingProduct(product);
  }

  async function saveEdit(id) {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProduct),
    });

    setEditingId(null);
    await fetchProducts();
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* Add New Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {["name", "image", "price", "category"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={`Product ${field}`}
            className="border px-2 py-1 rounded"
            value={newProduct[field]}
            onChange={(e) =>
              setNewProduct({ ...newProduct, [field]: e.target.value })
            }
          />
        ))}
        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-4"
          >
            {editingId === product.id ? (
              <div>
                {["name", "image", "price", "category"].map((field) => (
                  <input
                    key={field}
                    className="mb-2 w-full px-2 py-1 border rounded"
                    value={editingProduct[field]}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        [field]: e.target.value,
                      })
                    }
                  />
                ))}
                <button
                  onClick={() => saveEdit(product.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                {/* <Image
                  className="p-4 rounded-t-lg"
                  src={product.image || "/default-product.png"}
                  alt="product image"
                  width={400}
                  height={400}
                /> */}
                <Image
                  className="p-4 rounded-t-lg"
                  src={
                    product.image?.startsWith("http") || product.image?.startsWith("/")
                    ? product.image
                    : "/default-product.png"
                    }
                  alt="product image"
                  width={400}
                  height={400}
                />

                
                <h5 className="text-lg font-semibold mt-2">{product.name}</h5>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Category: {product.category}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
