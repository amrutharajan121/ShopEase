"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockProducts: [],
  });

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  // =========================
  // LOAD ADMIN DASHBOARD
  // =========================

  const loadDashboard = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const productsResponse = await fetch(
        "/api/admin/products",
        {
          headers,
        }
      );

      const ordersResponse = await fetch(
        "/api/admin/orders",
        {
          headers,
        }
      );

      const statsResponse = await fetch(
        "/api/admin/stats",
        {
          headers,
        }
      );

      // Check admin authorization
      if (
        productsResponse.status === 401 ||
        productsResponse.status === 403 ||
        ordersResponse.status === 401 ||
        ordersResponse.status === 403 ||
        statsResponse.status === 401 ||
        statsResponse.status === 403
      ) {
        alert("Admin access required");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      // Convert responses to JSON
      const productsData =
        await productsResponse.json();

      const ordersData =
        await ordersResponse.json();

      const statsData =
        await statsResponse.json();

      // Check stats response
      if (!statsResponse.ok) {
        console.error(
          "Stats API error:",
          statsData
        );

        alert(
          statsData.message ||
            "Failed to load statistics"
        );

        return;
      }

      setProducts(
        Array.isArray(productsData)
          ? productsData
          : []
      );

      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : []
      );

      setStats({
        totalOrders:
          statsData.totalOrders || 0,

        totalRevenue:
          statsData.totalRevenue || 0,

        totalProducts:
          statsData.totalProducts || 0,

        lowStockProducts:
          Array.isArray(
            statsData.lowStockProducts
          )
            ? statsData.lowStockProducts
            : [],
      });
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================

  const saveProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const url = editingId
      ? `/api/admin/products/${editingId}`
      : "/api/admin/products";

    const method = editingId
      ? "PUT"
      : "POST";

    try {
      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          stock: Number(form.stock),
          category: form.category,
          description: form.description,
          image: form.image,
        }),
      });

      const data =
        await response.json();

      if (response.ok) {
        alert(
          editingId
            ? "Product updated successfully"
            : "Product added successfully"
        );

        setForm({
          name: "",
          price: "",
          stock: "",
          category: "",
          description: "",
          image: "",
        });

        setEditingId(null);

        await loadDashboard();
      } else {
        alert(
          data.message ||
            "Operation failed"
        );
      }
    } catch (error) {
      console.error(
        "Product save error:",
        error
      );

      alert(
        "Something went wrong"
      );
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      category:
        product.category || "",
      description:
        product.description || "",
      image: product.image || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteProduct = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/products/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        alert(
          "Product deleted successfully"
        );

        await loadDashboard();
      } else {
        alert(
          data.message ||
            "Failed to delete product"
        );
      }
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );
    }
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateOrderStatus = async (
    id,
    status
  ) => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response =
        await fetch(
          `/api/admin/orders/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              status,
            }),
          }
        );

      const data =
        await response.json();

      if (response.ok) {
        alert(
          "Order status updated"
        );

        await loadDashboard();
      } else {
        alert(
          data.message ||
            "Failed to update order"
        );
      }
    } catch (error) {
      console.error(
        "Order status error:",
        error
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="admin-page">
        <h1>Admin Dashboard</h1>
        <p>
          Loading dashboard...
        </p>
      </main>
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================

  return (
    <main className="admin-page">

      {/* Header */}

      <div className="admin-header">

        <h1>
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Statistics */}

      <div className="admin-stats">

        <div className="stat-card">
          <h3>
            Total Products
          </h3>

          <p>
            {stats.totalProducts}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Total Orders
          </h3>

          <p>
            {stats.totalOrders}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Total Revenue
          </h3>

          <p>
            ₹{stats.totalRevenue}
          </p>
        </div>

        <div className="stat-card">
          <h3>
            Low Stock
          </h3>

          <p>
            {
              stats
                .lowStockProducts
                .length
            }
          </p>
        </div>

      </div>

      {/* Add / Edit Product */}

      <section className="admin-section">

        <h2>
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <form
          className="admin-form"
          onSubmit={saveProduct}
        >

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);

                setForm({
                  name: "",
                  price: "",
                  stock: "",
                  category: "",
                  description: "",
                  image: "",
                });
              }}
            >
              Cancel Edit
            </button>
          )}

        </form>

      </section>

      {/* Products */}

      <section className="admin-section">

        <h2>
          Products
        </h2>

        <div className="admin-products">

          {products.length === 0 ? (
            <p>
              No products found.
            </p>
          ) : (
            products.map(
              (product) => (
                <div
                  className="admin-product"
                  key={product._id}
                >

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    Category:{" "}
                    {product.category}
                  </p>

                  <p>
                    Price: ₹
                    {product.price}
                  </p>

                  <p>
                    Stock:{" "}
                    {product.stock}
                  </p>

                  <button
                    onClick={() =>
                      editProduct(
                        product
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(
                        product._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              )
            )
          )}

        </div>

      </section>

      {/* Orders */}

      <section className="admin-section">

        <h2>
          All Orders
        </h2>

        {orders.length === 0 ? (
          <p>
            No orders found.
          </p>
        ) : (
          orders.map(
            (order) => (
              <div
                className="admin-order"
                key={order._id}
              >

                <h3>
                  Order #
                  {order._id}
                </h3>

                <p>
                  Customer:{" "}
                  {
                    order
                      .customer
                      .name
                  }
                </p>

                <p>
                  Email:{" "}
                  {
                    order
                      .customer
                      .email
                  }
                </p>

                <p>
                  Total: ₹
                  {
                    order.totalAmount
                  }
                </p>

                <p>
                  Current Status:{" "}
                  <strong>
                    {order.status}
                  </strong>
                </p>

                <select
                  value={
                    order.status
                  }
                  onChange={(e) =>
                    updateOrderStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>
            )
          )
        )}

      </section>

      {/* Low Stock */}

      <section className="admin-section">

        <h2>
          Low Stock Products
        </h2>

        {stats.lowStockProducts
          .length === 0 ? (
          <p>
            No low-stock products.
          </p>
        ) : (
          stats.lowStockProducts.map(
            (product) => (
              <p
                key={product._id}
              >
                {product.name}
                {" — "}
                Stock:{" "}
                {product.stock}
              </p>
            )
          )
        )}

      </section>

    </main>
  );
}