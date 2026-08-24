"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");

        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);

      alert("Something went wrong");
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-icon">S</div>
          <span>ShopEase</span>
        </div>

        <div className="auth-intro">
          <h1>Join ShopEase</h1>

          <p>
            Create your account and discover products
            you'll love.
          </p>

          <div className="auth-benefits">
            <div className="benefit">
              <span>✓</span>
              <p>Easy and secure shopping</p>
            </div>

            <div className="benefit">
              <span>✓</span>
              <p>Track your orders easily</p>
            </div>

            <div className="benefit">
              <span>✓</span>
              <p>Save your favorite products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">

        <div className="register-card">

          <div className="mobile-brand">
            <div className="brand-icon">S</div>
            <span>ShopEase</span>
          </div>

          <div className="auth-heading">
            <h2>Create your account</h2>

            <p>
              Sign up to start shopping with ShopEase
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Create Account
            </button>

          </form>

          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          <a
            href="/login"
            className="login-link"
          >
            Login to your account
          </a>

        </div>

      </div>

    </main>
  );
}