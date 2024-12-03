import "./Profile.css";
import social from "../../assets/social.gif";
import { SiSolana } from "react-icons/si";
const Profile = () => {
  return (
    <div className="main">
      <div className="subtitle">
        <h3>
          View Your Profile from InsureChain{" "}
          <span className="insure">Insure</span>{" "}
          <i>
            <SiSolana />
          </i>
          <span className="insure2">XION</span>
        </h3>
      </div>

      <div className="profilecontainer">
        <div className="cardcontainer">
          <div className="profilecard">
            <div className="cards">
              <div className="profilecard2">
                <div className="detaili">
                  <img
                    className="profilelogo"
                    src="https://i.seadn.io/gae/Xed1Pkzstdj2GghgiyGMpJGZBObMFPsociGa9jZT7FlQcxShwo2XiqlNKP-ggQcNYQQnZk4aKLUHh1X_3OHSjaUCmQgfqcB9HStqDq8?auto=format&dpr=1&w=1000"
                    alt="default"
                  />
                  <h6>#0006</h6>
                </div>
                <div className="details">
                  <div className="firstattribute">
                    <p>
                      Name: <p>Nile_Dex</p>
                    </p>
                    <p>
                      Email: <p>josephakpansunday@gmail.com</p>
                    </p>
                    <p>
                      Plan:{" "}
                      <p>
                        <span className="insure">Premium +</span>
                      </p>
                    </p>
                  </div>
                  <div className="firstattribute">
                    <p>
                      Nationality: <p>Nigerian</p>
                    </p>
                    <p>
                      State: <p>Rivers State</p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="join">
              {" "}
              <img className="social" src={social} alt="Logo" />
              <h5>Join Socials Now</h5>
            </div>
          </div>
          <div className="transactioncard">
            <div className="titletxn">
              {" "}
              <h4>Transactions</h4>
              <span className="insure">New</span>
            </div>

            <div className="transaction">
              <div className="transaction-header">
                <span className="transaction-hash">Tx Hash: abc123...</span>
                <span className="transaction-status success">Success</span>
              </div>
              <div className="transaction-body">
                <div className="transaction-date">Date: 2024-11-25</div>
                <div className="transaction-amount">Amount: 1.23 SOL</div>
              </div>
            </div>
            <div className="transaction">
              <div className="transaction-header">
                <span className="transaction-hash">Tx Hash: abc123...</span>
                <span className="transaction-status success">Success</span>
              </div>
              <div className="transaction-body">
                <div className="transaction-date">Date: 2024-11-25</div>
                <div className="transaction-amount">Amount: 1.23 SOL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profilecontainer2">
        <div className="titletxn">
          {" "}
          <h4>Claims</h4>
        </div>
        <div className="claimstile">
          <div className="claim-header">
            <span className="claim-title">Available to Claim Rewards</span>
            <span className="claim-button">Claim</span>
          </div>
        </div>
        <div className="claimstile">
          <div className="claim-header">
            <span className="claim-title">Available to Claim Rewards</span>
            <span className="claim-button">Claim</span>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Profile;
