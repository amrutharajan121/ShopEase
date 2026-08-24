"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  try {
    const orderData = {
      customer: customer,

      products: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),

      totalAmount: total,
    };


   const token = localStorage.getItem("token");

const response = await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(orderData),
});

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully!");

      localStorage.removeItem("cart");

      window.location.href = "/";
    } else {
      alert(data.message || "Failed to place order");
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Something went wrong while placing the order");
  }
};

  return (
    <main className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        <div className="checkout-form">

          <h2>Customer Details</h2>

          <form onSubmit={handleSubmit}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />

            <label>
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              required
            />

            <label>
              Address
            </label>

            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              required
            />

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              value={customer.city}
              onChange={handleChange}
              required
            />

            <label>
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={customer.pincode}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Place Order
            </button>

          </form>

        </div>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((product) => (
            <div
              key={product._id}
              className="checkout-item"
            >

              <p>
                {product.name}
              </p>

              <p>
                {product.quantity} × ₹{product.price}
              </p>

            </div>
          ))}

          <hr />

          <h2>
            Total: ₹{total}
          </h2>

        </div>

      </div>

    </main>
  );
}