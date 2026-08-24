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
    return (
      <main className="product-details-page">
        <div className="product-loading">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <a href="/products" className="back-products-btn">
            ← Back to Products
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details-page">

      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <a href="/products">Products</a>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      {/* Main Product Section */}
      <section className="product-detail-card">

        {/* Product Image */}
        <div className="product-image-section">

          <div className="product-image-box">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

        </div>

        {/* Product Information */}
        <div className="product-info-section">

          <div className="product-category">
            {product.category}
          </div>

          <h1 className="product-detail-title">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="product-rating">

            <span className="stars">
              {"★".repeat(product.rating || 0)}
              {"☆".repeat(5 - (product.rating || 0))}
            </span>

            <span className="rating-text">
              {product.rating || 0} / 5
            </span>

          </div>

          <div className="product-divider"></div>

          {/* Price */}
          <div className="product-price-section">

            <span className="product-price">
              ₹{product.price}
            </span>

            <span className="tax-text">
              Inclusive of all taxes
            </span>

          </div>

          {/* Stock */}
          <div
            className={
              product.stock > 0
                ? "stock-status in-stock"
                : "stock-status out-of-stock"
            }
          >
            <span className="stock-dot"></span>

            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </div>

          {/* Description */}
          <div className="product-description">

            <h3>About this product</h3>

            <p>
              {product.description}
            </p>

          </div>

          {/* Product Actions */}
          <div className="product-actions">

            <AddToCartButton product={product} />

          </div>

          {/* Features */}
          <div className="product-features">

            <div className="product-feature">

              <div className="feature-icon">
                🚚
              </div>

              <div>
                <strong>Fast Delivery</strong>
                <span>Delivered to your doorstep</span>
              </div>

            </div>

            <div className="product-feature">

              <div className="feature-icon">
                🔒
              </div>

              <div>
                <strong>Secure Payment</strong>
                <span>100% secure checkout</span>
              </div>

            </div>

            <div className="product-feature">

              <div className="feature-icon">
                ↩️
              </div>

              <div>
                <strong>Easy Returns</strong>
                <span>7-day return policy</span>
              </div>

            </div>

          </div>

          {/* Back */}
          <a
            href="/products"
            className="back-products-btn"
          >
            ← Back to Products
          </a>

        </div>

      </section>

    </main>
  );
}