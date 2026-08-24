"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        if (data.user?.role === "admin") {
  window.location.href = "/admin";
} else {
  window.location.href = "/products";
}
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <style>{`

        .login-page {
          min-height: 100vh;
          background: #f1f3f6;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 40px 20px;

          font-family: Arial, Helvetica, sans-serif;
        }

        .login-page * {
          box-sizing: border-box;
        }

        /* Main login card */

        .login-card {
          width: 100%;
          max-width: 420px;

          background: #ffffff;

          padding: 40px 38px;

          border-radius: 8px;

          border: 1px solid #e0e3e8;

          box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.08);
        }

        /* Brand */

        .login-card::before {
          content: "ShopEase";

          display: block;

          text-align: center;

          margin-bottom: 25px;

          color: #2874f0;

          font-size: 30px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .login-card h1 {
          margin: 0 0 28px;

          text-align: center;

          color: #172337;

          font-size: 25px;
          font-weight: 600;
        }

        /* Form */

        .login-card form {
          display: flex;
          flex-direction: column;
        }

        .login-card label {
          margin-bottom: 7px;

          color: #333333;

          font-size: 14px;
          font-weight: 600;
        }

        .login-card input {
          width: 100%;
          height: 46px;

          padding: 0 14px;

          margin-bottom: 20px;

          border: 1px solid #d5d9df;
          border-radius: 5px;

          outline: none;

          color: #172337;
          background: #ffffff;

          font-size: 14px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .login-card input:focus {
          border-color: #2874f0;

          box-shadow:
            0 0 0 3px rgba(40, 116, 240, 0.1);
        }

        /* Login button */

        .login-card button {
          width: 100%;

          height: 46px;

          margin-top: 5px;

          border: none;
          border-radius: 5px;

          background: #2874f0;
          color: #ffffff;

          font-size: 16px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .login-card button:hover {
          background: #1769d1;

          transform: translateY(-1px);
        }

        /* Register section */

        .login-card p {
          margin: 25px 0 0;

          padding-top: 22px;

          border-top: 1px solid #eeeeee;

          text-align: center;

          color: #666666;

          font-size: 14px;
        }

        .login-card a {
          color: #2874f0;

          font-weight: 600;

          text-decoration: none;
        }

        .login-card a:hover {
          text-decoration: underline;
        }

        /* Mobile */

        @media (max-width: 500px) {

          .login-page {
            padding: 25px 15px;
          }

          .login-card {
            padding: 32px 24px;
          }

          .login-card::before {
            font-size: 27px;
          }

          .login-card h1 {
            font-size: 23px;
          }

        }

      `}</style>

      <main className="login-page">

        <div className="login-card">

          <h1>Login</h1>

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p>
            Don't have an account?{" "}
            <a href="/register">
              Register
            </a>
          </p>

        </div>

      </main>
    </>
  );
}