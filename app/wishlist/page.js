"use client";

import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  const getWishlistKey = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const userId =
        payload.id ||
        payload._id ||
        payload.userId ||
        payload.sub ||
        payload.email;

      if (!userId) {
        return null;
      }

      return `wishlist_${userId}`;
    } catch (error) {
      console.error(
        "Error reading user information:",
        error
      );

      return null;
    }
  };

  useEffect(() => {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) {
      setWishlist([]);
      return;
    }

    const savedWishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) {
      return;
    }

    const updatedWishlist = wishlist.filter(
      (product) => product._id !== productId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <main className="wishlist-page">

      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">

          <h2>Your wishlist is empty</h2>

          <p>
            Add some products you love!
          </p>

          <a href="/products">
            Browse Products
          </a>

        </div>
      ) : (

        <div className="wishlist-container">

          {wishlist.map((product) => (

            <div
              key={product._id}
              className="wishlist-card"
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div>

                <h2>
                  {product.name}
                </h2>

                <p>
                  {product.category}
                </p>

                <p className="price">
                  ₹{product.price}
                </p>

                <button
                  onClick={() =>
                    removeFromWishlist(
                      product._id
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}