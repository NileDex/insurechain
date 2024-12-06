import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "./Form.css";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  const signupUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const response = await axios.post("https://insurechain-server.onrender.com/signup", {
        name,
        email,
        password,
      });

      const responseData = response.data;

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Signup Successful! Welcome to InsureChain!");
        navigate("/"); // Navigate to home after successful signup
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="app">
      <div>
        <h2>Signup</h2>
        <h4>Welcome to InsureChain</h4>
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
        <form onSubmit={signupUser}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={data.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
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
          <button type="submit">
            Sign up
          </button>
        </form>
      </div>
      <div className="alternative-sign">
        Signup with Google
        <p>
          <FcGoogle />
        </p>
      </div>
      <p className="vio">
        Already have an account? <Link to="/">Login Here</Link>
      </p>
    </main>
  );
};

export default SignupForm;
