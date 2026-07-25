import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();
  console.log("Navigate is:", navigate);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login Failed:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Login Failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-badge">
            🔐 Secure Authentication
          </div>

          <h2 className="auth-title">
            Welcome Back
          </h2>

          <p className="auth-subtitle">
            Access your SecureScan security dashboard
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="auth-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="auth-input"
              required
            />
          </div>

          <div className="auth-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="auth-input"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "🔄 Authenticating..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;