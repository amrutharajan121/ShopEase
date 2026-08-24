"use client";

import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product._id !== productId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <main className="wishlist-page">

      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>
          <p>Add some products you love!</p>

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
                <h2>{product.name}</h2>

                <p>
                  {product.category}
                </p>

                <p className="price">
                  ₹{product.price}
                </p>

                <button
                  onClick={() =>
                    removeFromWishlist(product._id)
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