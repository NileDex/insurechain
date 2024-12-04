import { Link } from "react-router-dom";
import "./Form.css";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  return (
    <main className="app">
      <div>
        <h2>Signup</h2>
        <h4>Welcome  to Insurechain</h4>
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
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign up | <Link to="/home"> {'>>>'}</Link></button>
        </form>
      </div>
      <div className="alternative-sign">
        Signup with Google
        <p>
          <FcGoogle />
        </p>
      </div>
      <p className="vio">
        Don't have an account <Link to="/"> Login Here</Link>
      </p>
    </main>
  );
};

export default SignupForm;
