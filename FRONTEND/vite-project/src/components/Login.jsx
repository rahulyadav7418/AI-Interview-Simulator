import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ onLoginSuccess, onShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", res.data.token);

      onLoginSuccess(res.data.token);

      // alert("Login successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="login-page">
      {" "}
      <div className="login-card">
        {" "}
        <div className="login-logo">AI</div>
        <h1>The AI-Powered Interview Plateform</h1>
        <p className="login-subtitle">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login <span>→</span>
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <button type="button" className="signup-link" onClick={onShowSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
