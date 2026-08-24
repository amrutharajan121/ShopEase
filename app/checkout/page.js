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
    <>
      <style>{`

        /* =====================================
           CHECKOUT PAGE
        ===================================== */

        .checkout-page {
          min-height: 100vh;
          background: #f1f3f6;
          padding: 40px 6%;
          color: #172337;
          box-sizing: border-box;
        }

        .checkout-page * {
          box-sizing: border-box;
        }

        .checkout-page h1 {
          max-width: 1150px;
          margin: 0 auto 28px;
          font-size: 32px;
          font-weight: 700;
          color: #172337;
        }

        /* Main layout */

        .checkout-container {
          max-width: 1150px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1.6fr 0.9fr;
          gap: 24px;

          align-items: start;
        }

        /* =====================================
           CUSTOMER DETAILS
        ===================================== */

        .checkout-form {
          background: #ffffff;
          border: 1px solid #e0e3e8;
          border-radius: 8px;
          padding: 28px;

          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .checkout-form h2 {
          margin: 0 0 24px;
          padding-bottom: 18px;

          border-bottom: 1px solid #eeeeee;

          font-size: 21px;
          font-weight: 600;
          color: #172337;
        }

        /* Form */

        .checkout-form form {
          display: flex;
          flex-direction: column;
        }

        .checkout-form label {
          display: block;

          margin-top: 16px;
          margin-bottom: 7px;

          font-size: 14px;
          font-weight: 600;
          color: #333333;
        }

        .checkout-form label:first-of-type {
          margin-top: 0;
        }

        .checkout-form input,
        .checkout-form textarea {
          width: 100%;

          padding: 12px 14px;

          border: 1px solid #d5d9df;
          border-radius: 5px;

          background: #ffffff;

          color: #172337;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;

          outline: none;

          transition: border 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .checkout-form input {
          height: 44px;
        }

        .checkout-form textarea {
          min-height: 95px;
          resize: vertical;
        }

        .checkout-form input:focus,
        .checkout-form textarea:focus {
          border-color: #2874f0;

          box-shadow:
            0 0 0 3px rgba(40, 116, 240, 0.1);
        }

        /* Place order button */

        .checkout-form button[type="submit"] {
          width: 100%;

          margin-top: 28px;
          padding: 14px 20px;

          border: none;
          border-radius: 5px;

          background: #ff9f00;
          color: #ffffff;

          font-size: 16px;
          font-weight: 700;

          cursor: pointer;

          transition: background 0.2s ease,
                      transform 0.2s ease;
        }

        .checkout-form button[type="submit"]:hover {
          background: #fb8c00;
          transform: translateY(-1px);
        }

        /* =====================================
           ORDER SUMMARY
        ===================================== */

        .checkout-summary {
          background: #ffffff;

          border: 1px solid #e0e3e8;
          border-radius: 8px;

          padding: 25px;

          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

          position: sticky;
          top: 25px;
        }

        .checkout-summary h2:first-child {
          margin: 0 0 20px;

          padding-bottom: 18px;

          border-bottom: 1px solid #eeeeee;

          font-size: 21px;
          font-weight: 600;
          color: #172337;
        }

        /* Product row */

        .checkout-item {
          display: flex;

          justify-content: space-between;
          align-items: center;

          gap: 20px;

          padding: 16px 0;

          border-bottom: 1px solid #eeeeee;
        }

        .checkout-item p {
          margin: 0;

          font-size: 14px;
          color: #555555;
        }

        .checkout-item p:first-child {
          font-weight: 600;
          color: #172337;
        }

        .checkout-item p:last-child {
          white-space: nowrap;
          font-weight: 500;
        }

        /* Divider */

        .checkout-summary hr {
          border: none;
          border-top: 1px solid #e1e5ea;

          margin: 20px 0;
        }

        /* Total */

        .checkout-summary h2:last-child {
          margin: 0;

          font-size: 23px;
          font-weight: 700;

          color: #172337;
        }

        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 850px) {

          .checkout-page {
            padding: 30px 5%;
          }

          .checkout-container {
            grid-template-columns: 1fr;
          }

          .checkout-summary {
            position: static;
          }

        }

        @media (max-width: 550px) {

          .checkout-page {
            padding: 25px 15px;
          }

          .checkout-page h1 {
            font-size: 27px;
          }

          .checkout-form,
          .checkout-summary {
            padding: 20px;
          }

        }

      `}</style>

      <main className="checkout-page">

        <h1>Checkout</h1>

        <div className="checkout-container">

          {/* Customer Details */}

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

          {/* Order Summary */}

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
    </>
  );
}