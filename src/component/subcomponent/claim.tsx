
const Claim = () => {
  return (
    <>
      <div className="claim-cont">
        <div className="subtitle">
          <h3>
            View Your Account from InsureChain{" "}
            <span className="insure">Insure</span>{" "}
        
            <span className="insure2">XION</span>
          </h3>
        </div>
        <div className="profilecontainer">
          <div className="solcard1">
            <div className="titletxn">
              {" "}
              <h4>Wallets</h4>
            </div>
            <div className="solcard">
              <button>Connect Solana Wallet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
