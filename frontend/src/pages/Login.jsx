import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
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

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user || data)
      );

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trendora-login">

      {/* Background decorations */}
      <div className="login-circle circle-one"></div>
      <div className="login-circle circle-two"></div>

      {/* Main Container */}
      <div className="login-container">

        {/* Left Fashion Section */}
        <div className="login-showcase">

          <div className="showcase-content">

            <div className="trendora-logo">
              <span className="logo-mark">T</span>
              <span>TRENDORA</span>
            </div>

            <p className="showcase-small">
              YOUR STYLE. YOUR STATEMENT.
            </p>

            <h1>
              Fashion that
              <br />
              <span>feels like you.</span>
            </h1>

            <p className="showcase-description">
              Discover fashion that matches your personality.
              Explore trending styles, timeless classics and
              everything in between.
            </p>

            <div className="showcase-features">
              <div>
                <span>✦</span>
                <p>Latest Trends</p>
              </div>

              <div>
                <span>✦</span>
                <p>Premium Quality</p>
              </div>

              <div>
                <span>✦</span>
                <p>Easy Shopping</p>
              </div>
            </div>

          </div>

          <div className="fashion-text">
            TRENDORA
          </div>

        </div>

        {/* Login Section */}
        <div className="login-section">

          <div className="login-card">

            {/* Mobile Logo */}
            <div className="mobile-trendora-logo">
              <span className="logo-mark">T</span>
              <span>TRENDORA</span>
            </div>

            <div className="login-heading">
              <p>WELCOME BACK</p>
              <h2>Sign in</h2>
              <span>
                Sign in to continue your shopping journey.
              </span>
            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-box">

                  <span className="field-icon">
                    ✉
                  </span>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="form-group">

                <div className="password-heading">

                  <label htmlFor="password">
                    Password
                  </label>

                  <Link to="/forgot-password">
                    Forgot Password?
                  </Link>

                </div>

                <div className="input-box">

                  <span className="field-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="login-error">
                  <span>!</span>
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="button-arrow">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

            {/* Register */}
            <div className="register-text">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>

            {/* Security */}
            <div className="security-info">
              <span>🔐</span>
              Secure &amp; safe shopping experience
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
