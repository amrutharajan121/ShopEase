"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      // If user is not logged in
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // If token is invalid/expired
      if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (response.ok) {
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="orders-page">
        <Navbar />
        <h1>My Orders</h1>
        <p>Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-container">

          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card"
            >

              {/* Order Header */}
              <div className="order-header">

                <h2>
                  Order #{order._id}
                </h2>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              {/* Customer Details */}
              <div className="order-customer">

                <p>
                  <strong>Customer:</strong>{" "}
                  {order.customer.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.customer.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.customer.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.customer.address},{" "}
                  {order.customer.city} -{" "}
                  {order.customer.pincode}
                </p>

              </div>

              {/* Products */}
              <div className="order-products">

                <h3>Products</h3>

                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="order-product"
                  >

                    <p>
                      <strong>{product.name}</strong>
                    </p>

                    <p>
                      ₹{product.price} ×{" "}
                      {product.quantity}
                    </p>

                  </div>
                ))}

              </div>

              {/* Total */}
              <div className="order-total">
                Total: ₹{order.totalAmount}
              </div>

              {/* Order Date */}
              <p className="order-date">
                <strong>Order Date:</strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

            </div>
          ))}

        </div>
      )}

    </main>
  );
}