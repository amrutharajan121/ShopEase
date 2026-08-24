"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <main className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <a href="/" className="logo">
          <span className="logo-icon">S</span>
          <span>ShopEase</span>
        </a>

        <div className="nav-links">
          <a href="/" className="active">Home</a>
          <a href="/products">Products</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/orders">Orders</a>
        </div>

        <div className="nav-actions">

          <a href="/cart" className="nav-icon">
            🛒
            <span>Cart</span>
          </a>

          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <a href="/login" className="login-btn">
              Login
            </a>
          )}

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-tag">
            NEW COLLECTION 2026
          </span>

          <h1>
            Everything you need,
            <br />
            <span>all in one place.</span>
          </h1>

          <p>
            Discover quality products, great prices and everything
            you love — delivered right to your doorstep.
          </p>

          <div className="hero-buttons">
            <a href="/products" className="primary-btn">
              Shop Now →
            </a>

            <a href="/products" className="secondary-btn">
              Explore Collection
            </a>
          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="floating-card card-one">
            <span>⭐</span>
            <div>
              <strong>Top Rated</strong>
              <small>Best customer reviews</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>🚚</span>
            <div>
              <strong>Fast Delivery</strong>
              <small>Delivered to your door</small>
            </div>
          </div>

          <div className="hero-product">
            <div className="product-emoji">🛍️</div>
          </div>

        </div>

      </section>


      {/* ================= BENEFITS ================= */}
      <section className="benefits">

        <div className="benefit-item">
          <div className="benefit-icon">🚚</div>
          <div>
            <h3>Free Delivery</h3>
            <p>On orders above ₹999</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">🔒</div>
          <div>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">↩️</div>
          <div>
            <h3>Easy Returns</h3>
            <p>7-day return policy</p>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon">💬</div>
          <div>
            <h3>Customer Support</h3>
            <p>We're here to help</p>
          </div>
        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="category-section">

        <div className="section-heading">
          <div>
            <span>EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <a href="/products">
            View all →
          </a>
        </div>

        <div className="category-grid">

          <a href="/products" className="category-card electronics">
            <div className="category-icon">💻</div>
            <div>
              <h3>Electronics</h3>
              <p>Smart devices & gadgets</p>
            </div>
            <span className="category-arrow">→</span>
          </a>

          <a href="/products" className="category-card fashion">
            <div className="category-icon">👕</div>
            <div>
              <h3>Fashion</h3>
              <p>Style for every occasion</p>
            </div>
            <span className="category-arrow">→</span>
          </a>

          <a href="/products" className="category-card shoes">
            <div className="category-icon">👟</div>
            <div>
              <h3>Footwear</h3>
              <p>Step into something new</p>
            </div>
            <span className="category-arrow">→</span>
          </a>

          <a href="/products" className="category-card beauty">
            <div className="category-icon">✨</div>
            <div>
              <h3>Beauty</h3>
              <p>Care & personal essentials</p>
            </div>
            <span className="category-arrow">→</span>
          </a>

        </div>

      </section>


      {/* ================= PROMO ================= */}
      <section className="promo-section">

        <div>
          <span>LIMITED TIME OFFER</span>
          <h2>Get up to 30% off</h2>
          <p>
            Upgrade your everyday essentials without breaking the bank.
          </p>

          <a href="/products" className="promo-btn">
            Shop the Sale →
          </a>
        </div>

        <div className="promo-icon">
          🛍️
        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-brand">
          <a href="/" className="logo">
            <span className="logo-icon">S</span>
            <span>ShopEase</span>
          </a>

          <p>
            Your everyday shopping destination.
            Quality products, great prices.
          </p>
        </div>

        <div className="footer-column">
          <h4>Shop</h4>
          <a href="/products">All Products</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>

        <div className="footer-column">
          <h4>Help</h4>
          <a href="#">Contact Us</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">FAQs</a>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>

      </footer>

      <div className="footer-bottom">
        © 2026 ShopEase. All rights reserved.
      </div>

    </main>
  );
}