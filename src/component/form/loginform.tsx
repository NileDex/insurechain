import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Form.css";
import { useAuth } from "./AUTHENTICATION/authentication";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {setUser} = useAuth();
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state for progress bar

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = data;

    setLoading(true); // Show the progress bar
    try {
      const response = await axios.post("https://insurechain-server.onrender.com/login", {
        email,
        password,
      });

      const {user, token} = response.data;

      setUser({
        name: user.name,
        email: user.email,
        _id: user._id,
      });

      localStorage.setItem("auth-token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Login successful!");
        setData({ email: "", password: "" });
        navigate("/xion");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false); // Hide the progress bar
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="app">
      {loading && <div className="progress-bar"></div>} {/* Progress bar */}
      <div>
        <h2>Login</h2>
        <h4>Welcome back to InsureChain</h4>
      </div>
      <div className="form-container">
        <div className="formlogo">
          <i>
            <img
              src="https://storage.googleapis.com/taikai-storage/images/6c1a0260-4842-11ef-a51e-5717adc69fe1HBX3LN0j_400x400.jpg"
              className="formbarlogo"
              alt="logo"
            />
          </i>
        </div>
        <form onSubmit={loginUser}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="alternative-sign">
        Continue with Google
        <p>
          <FcGoogle />
        </p>
      </div>
      <p className="vio">
        Don't have an account? <Link to="/xion">XION</Link>
        <Link to="/signup"> Sign up Here</Link>
      </p>
    </main>
  );
};

export default LoginForm;
