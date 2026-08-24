"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <a href="/products">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>

          <div className="cart-page-items">

            {cart.map((product) => (
              <div
                className="cart-page-item"
                key={product._id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-page-info">

                  <h2>{product.name}</h2>

                  <p>
                    Category: {product.category}
                  </p>

                  <p>
                    Price: ₹{product.price}
                  </p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          product._id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          product._id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        product._id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

                <div className="item-total">

                  ₹
                  {product.price *
                    product.quantity}

                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <p>
              Total Items:{" "}
              {cart.reduce(
                (sum, item) =>
                  sum + item.quantity,
                0
              )}
            </p>

            <h2>
              Total: ₹{total}
            </h2>

            <button
  onClick={() => {
    window.location.href = "/checkout";
  }}
>
  Proceed to Checkout
</button>

          </div>

        </>
      )}

    </main>
  );
}