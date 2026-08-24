"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status only after the page loads
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // Back button
  const handleBack = () => {
    router.back();
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="back-btn"
      >
        ← Back
      </button>

      {/* Logo */}
      <Link href="/products" className="logo">
        <span className="logo-icon">S</span>
        <span>ShopEase</span>
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">

        <Link href="/products">
          Products
        </Link>

        <Link href="/wishlist">
          Wishlist
        </Link>

        <Link href="/orders">
          Orders
        </Link>

        <Link href="/cart">
          🛒 Cart
        </Link>

      </div>

      {/* Login / Logout */}
      <div className="nav-actions">

        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="login-btn"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}