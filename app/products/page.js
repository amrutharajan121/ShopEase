"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
    rating: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Load products and cart when page opens
 useEffect(() => {
  fetchProducts();

  const savedCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  setCart(savedCart);

  const savedWishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  setWishlist(savedWishlist);
}, []);


  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${product.name} added to cart`);
  };

  // Add product to wishlist
const addToWishlist = (product) => {
  const alreadyInWishlist = wishlist.some(
    (item) => item._id === product._id
  );

  if (alreadyInWishlist) {
    alert("Product already in wishlist");
    return;
  }

  const updatedWishlist = [
    ...wishlist,
    product,
  ];

  setWishlist(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );

  alert(`${product.name} added to wishlist`);
};


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

  // Remove product from cart
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

  // Add product
  const addProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          rating: Number(newProduct.rating),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully");

        setShowAddForm(false);

        setNewProduct({
          name: "",
          price: "",
          stock: "",
          category: "",
          description: "",
          image: "",
          rating: "",
        });

        fetchProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product deleted successfully");

        setProducts(
          products.filter(
            (product) => product._id !== id
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Open edit form
  const editProduct = (product) => {
    setEditingProduct(product);
  };

  // Update product
  const updateProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product updated successfully");

        setEditingProduct(null);

        fetchProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <main className="products-page">

      <h1>All Products</h1>

      <p>
        Cart Items: {cart.length}
      </p>

      {/* Cart Section */}

      {cart.length > 0 && (
        <div className="cart-section">

          <h2>Your Cart</h2>

          {cart.map((product) => (
            <div
              className="cart-item"
              key={product._id}
            >

              <div>

                <h3>{product.name}</h3>

                <p>₹{product.price}</p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(product._id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(product._id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(product._id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          <h3>
            Total: ₹
            {cart.reduce(
              (total, product) =>
                total +
                product.price * product.quantity,
              0
            )}
          </h3>

        </div>
      )}

      <p>
        Explore our collection of products
      </p>

      <button
  onClick={() => setShowAddForm(true)}
>
  Add Product
</button>

<Link href="/cart" className="view-cart-button">
  View Cart
</Link>

      {/* Products */}

      <div className="products-container">

        {products.map((product) => (
          <div
            className="product-card"
            key={product._id}
          >

            <div className="product-image">

              <img
                src={product.image}
                alt={product.name}
                onClick={() => {
                  window.location.href =
                    `/products/${product._id}`;
                }}
                style={{
                  cursor: "pointer",
                }}
              />

            </div>

            <h2
              onClick={() => {
                window.location.href =
                  `/products/${product._id}`;
              }}
              style={{
                cursor: "pointer",
              }}
            >
              {product.name}
            </h2>

            <p>
              {product.category}
            </p>

            <p className="price">
              ₹{product.price}
            </p>

            <p>
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </p>

            <button
              onClick={() =>
                addToCart(product)
              }
            >
              Add to Cart
            </button>

              <button
  onClick={() =>
    addToWishlist(product)
  }
>
  ❤️ Add to Wishlist
</button>


            <button
              onClick={() =>
                editProduct(product)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteProduct(product._id)
              }
            >
              Delete
            </button>

          </div>
        ))}

      </div>

      {/* Add Product Form */}

      {showAddForm && (
        <div className="edit-form">

          <h2>Add Product</h2>

          <form onSubmit={addProduct}>

            <label>
              Product Name
            </label>

            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
              required
            />

            <label>
              Price
            </label>

            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
              required
            />

            <label>
              Stock
            </label>

            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: e.target.value,
                })
              }
              required
            />

            <label>
              Category
            </label>

            <input
              type="text"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
              required
            />

            <label>
              Description
            </label>

            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              required
            />

            <label>
              Image URL
            </label>

            <input
              type="text"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
              required
            />

            <label>
              Rating
            </label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={newProduct.rating}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  rating: e.target.value,
                })
              }
              required
            />

            <button type="submit">
              Add Product
            </button>

            <button
              type="button"
              onClick={() =>
                setShowAddForm(false)
              }
            >
              Cancel
            </button>

          </form>

        </div>
      )}

      {/* Edit Product Form */}

      {editingProduct && (
        <div className="edit-form">

          <h2>Edit Product</h2>

          <form onSubmit={updateProduct}>

            <label>
              Product Name
            </label>

            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />

            <label>
              Price
            </label>

            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: Number(
                    e.target.value
                  ),
                })
              }
            />

            <label>
              Stock
            </label>

            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stock: Number(
                    e.target.value
                  ),
                })
              }
            />

            <label>
              Category
            </label>

            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            />

            <label>
              Description
            </label>

            <textarea
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />

            <label>
              Image URL
            </label>

            <input
              type="text"
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  image: e.target.value,
                })
              }
            />

            <label>
              Rating
            </label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={editingProduct.rating}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  rating: Number(
                    e.target.value
                  ),
                })
              }
            />

            <button type="submit">
              Update Product
            </button>

            <button
              type="button"
              onClick={() =>
                setEditingProduct(null)
              }
            >
              Cancel
            </button>

          </form>

        </div>
      )}

    </main>
  );
}