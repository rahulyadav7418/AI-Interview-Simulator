import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Signup({ onSignupSuccess, onShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/signup", {
        name,
        email,
        password,
      });

      alert(res.data.message || res.data);

      onSignupSuccess();
    } catch (error) {
      console.log("Signup Error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Signup failed. Please try again.",
      );
    }
  }

  return (
    <div className="login-page">
      {" "}
      <div className="login-card">
        {" "}
        <div className="login-logo">AI</div>
        <h1>The AI-Powered Interview Plateform</h1>
        <p className="login-subtitle">Create your account to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="signup-email">Email Address</label>

            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="signup-password">Password</label>

            <div className="password-input-wrapper">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
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
            Create Account <span>→</span>
          </button>
        </form>
        <p className="signup-text">
          Already have an account?{" "}
          <button type="button" className="signup-link" onClick={onShowLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
