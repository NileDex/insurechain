import "./css/Profile.css";
import social from "../../assets/social.gif";
import CreateProfileModal from "./CreateProfileModal";
import HealthProfileDisplay from "./rendercard/page";
import { useWallet } from "@solana/wallet-adapter-react";
import TransactionCard from "./rendertransaction/page";
const Profile = () => {






  const wallet = useWallet();
  return (
    <div className="main">
      <div className="subtitle">
        <h3>
          View Your Profile from InsureChain{" "}
          <span className="insure">Insure</span>{" "}

          <span className="insure2">XION</span>

          <CreateProfileModal />
        </h3>
      </div>

      <div className="profilecontainer">

        <div className="cardcontainer">

          <div className="profilecard">

            {wallet.publicKey && (
              <HealthProfileDisplay publicKey={wallet.publicKey} />
            )}

            <div className="join">
              {" "}
              <img className="social" src={social} alt="Logo" />
              <h5>Join Socials Now</h5>
            </div>
          </div>

          <TransactionCard />
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
