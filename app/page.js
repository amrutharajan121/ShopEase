"use client";

export default function Home() {
  return (
    <main>
      {/* Navbar */}
      <nav className="navbar">
        <h2>🛍️ ShopEase</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/wishlist">Wishlist ♡</a>
          <a href="/cart">Cart 🛒</a>
          <a href="/orders">Orders</a>
          {typeof window !== "undefined" && localStorage.getItem("token") ? (
  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }}
  >
    Logout
  </button>
) : (
  <a href="/login">Login</a>
)}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Shop Everything You Love</h1>

        <p>
          Discover amazing products at the best prices.
        </p>

        <button>Shop Now</button>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-container">
          <div className="category-card">
            <h3>📱 Electronics</h3>
            <p>Phones, laptops and more</p>
          </div>

          <div className="category-card">
            <h3>👗 Fashion</h3>
            <p>Clothing and accessories</p>
          </div>

          <div className="category-card">
            <h3>👟 Shoes</h3>
            <p>Find your perfect pair</p>
          </div>

          <div className="category-card">
            <h3>💄 Beauty</h3>
            <p>Beauty and personal care</p>
          </div>
        </div>
      </section>
    </main>
  );
}