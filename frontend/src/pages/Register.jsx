import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const response = await api.post("/auth/register", formData);

      alert(response.data.message || "User registered successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Registration Failed. Please try again."
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
            Create SecureScan Account
          </h2>

          <p className="auth-subtitle">
            Protect your digital assets with intelligent security analysis
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="auth-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="auth-input"
              required
            />
          </div>

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
            className="auth-button register-button"
            disabled={loading}
          >
            {loading ? "🔄 Creating Account..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;