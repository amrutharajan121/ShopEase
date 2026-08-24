"use client";

import { useEffect, useState } from "react";
import AddToCartButton from "@/app/components/AddToCartButton";

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;

        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main className="product-details">

      <h1>{product.name}</h1>

      <div className="details-container">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="details-info">

          <h2
  onClick={() => {
    window.location.href = `/products/${product._id}`;
  }}
  style={{ cursor: "pointer" }}
>
  {product.name}
</h2>

          <p>
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Price:</strong>{" "}
            ₹{product.price}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.stock}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {product.description}
          </p>

          <AddToCartButton product={product} />

<br />

<a href="/products">
  <button>
    Back to Products
  </button>
</a>

        </div>

      </div>

    </main>
  );
}