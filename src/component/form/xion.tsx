import "./Form.css";
import burnt from "../../assets/burnt.png";
// import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";

const Xion = () => {
  const navigate = useNavigate();
  const {
    data: { bech32Address },
    isConnected,
  } = useAbstraxionAccount();
  const [, setShow] = useModal();

  // Redirect to dashboard if connected
  useEffect(() => {
    if (isConnected && bech32Address) {
      navigate("/home");
    }
  }, [isConnected, bech32Address, navigate]);

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
       
        <Button fullWidth onClick={() => setShow(true)} structure="base">
          CONNECT WITH WALLET ABSTRACTION
        </Button>
        <Abstraxion onClose={() => setShow(false)} />
      
      </div>

      <p className="vio">
        Don't know about Abstraction? <Link to="/">Login Here</Link>
      </p>
    </main>
  );
};

export default Xion;
