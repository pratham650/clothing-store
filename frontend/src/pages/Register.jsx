import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear password errors when user starts typing
    if (e.target.name === "password") {
      setPasswordErrors([]);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPasswordErrors([]);
    
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        setPasswordErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || "Registration failed!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 animate-fadeIn">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md animate-scaleIn">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={form.name}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          
          {/* Password Requirements */}
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-semibold">Password must contain:</p>
            <ul className="list-disc list-inside space-y-1">
              <li className={form.password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
              <li className={/[A-Z]/.test(form.password) ? "text-green-600" : ""}>One uppercase letter</li>
              <li className={/[a-z]/.test(form.password) ? "text-green-600" : ""}>One lowercase letter</li>
              <li className={/[0-9]/.test(form.password) ? "text-green-600" : ""}>One number</li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(form.password) ? "text-green-600" : ""}>One special character</li>
            </ul>
          </div>

          {passwordErrors.length > 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-sm">
              <p className="font-semibold mb-1">Password requirements not met:</p>
              <ul className="list-disc list-inside space-y-1">
                {passwordErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
