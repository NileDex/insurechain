import { Link } from "react-router-dom";
import "./Form.css";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  return (
    <main className="app">
      <div>
      <h2>Login</h2>
        <h4>Welcome back to Insurechain</h4>
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
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="alternative-sign">
        Continue with Goggle
        <p>
          <FcGoogle />
        </p>
      </div>
      <p className="vio">
        Dont have an account <Link to="/xion"> Sign up Here</Link>
      </p>
    </main>
  );
};

export default LoginForm;
