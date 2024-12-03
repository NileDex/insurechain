import { SiSolana } from "react-icons/si";
const Claim = () => {
  return (
    <>
      <div className="claim-cont">
        <div className="subtitle">
          <h3>
            View Your Account from InsureChain{" "}
            <span className="insure">Insure</span>{" "}
            <i>
              <SiSolana />
            </i>
            <span className="insure2">XION</span>
          </h3>
        </div>
        <div className="profilecontainer"></div>
      </div>
    </>
  );
};

export default Claim;
