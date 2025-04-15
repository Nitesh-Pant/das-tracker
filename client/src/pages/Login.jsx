import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form className="bg-white p-6 rounded-lg shadow-lg w-80" onSubmit={handleSubmit}>
    <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

    <input
      className="w-full mb-3 px-3 py-2 border rounded"
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
    />
    <input
      className="w-full mb-4 px-3 py-2 border rounded"
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
    />

    <button
      type="submit"
      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
    >
      Login
    </button>

    <p className="mt-4 text-sm text-center">
      Don’t have an account?{" "}
      <span
        onClick={() => navigate('/register')}
        className="text-blue-600 hover:underline cursor-pointer"
      >
        Create one
      </span>
    </p>
  </form>
</div>

  );
};

export default Login;
