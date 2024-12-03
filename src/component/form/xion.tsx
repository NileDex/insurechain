
import "./Form.css";
import burnt from "../../assets/burnt.png";
import { Link } from "react-router-dom";

const Xion = () => {
  return (
    <main className="app">
      <div>
        <h2>Abstraction</h2>
        <h4>Welcome back to Insurechain</h4>
      </div>
      <div className="xion-container">
        <div className="abstraction">
          <div className="formlogo">
            <i>
              <img
                src="https://storage.googleapis.com/taikai-storage/images/6c1a0260-4842-11ef-a51e-5717adc69fe1HBX3LN0j_400x400.jpg"
                className="xionbarlogo"
                alt="logo"
              />
            </i>
          </div>
          <div className="formlogo">
            <i>
              <img
                src={burnt}
                className="xionbarlogo"
                alt="logo"
              />
            </i>
          </div>
        </div>
        <form>
          <button type="submit">Continue with  <Link to="/signup"> {'Wallet Abstraction'}</Link></button>
        </form>
      </div>

      <p className="vio">
        Dont know abut Abstraction Learn More here
      </p>
    </main>
  );
};

export default Xion;
