import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "../../form/connection/page";
import "./healthprofile.css"; // Add styles for spinner if needed

interface HealthProfileData {
  name: string;
  email: string;
  image: string;
  nationality: string;
  state: string;
  plan: string;
  hospital: string;
  authority: PublicKey;
}

const HealthProfileDisplay = ({ publicKey }: { publicKey: PublicKey }) => {
  const wallet = useWallet();
  const [profileData, setProfileData] = useState<HealthProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setError("Wallet not connected.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const program = getProgram(wallet);
      if (!program) {
        throw new Error("Program initialization failed.");
      }
      const [profilePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("health-profile"), publicKey.toBuffer()],
        program.programId
      );
      console.log("Attempting to fetch PDA:", profilePDA.toBase58());

      const accountData = await program.account?.healthProfile?.fetch(profilePDA);
      if (!accountData) {
        setError("No profile found.");
        return;
      }
      console.log("Fetched account data:", accountData);
      setProfileData(accountData as HealthProfileData);
    } catch (err: any) {
      console.error("Error fetching profile data:", err);
      setError(err.message || "Failed to fetch profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      fetchProfile();
    }
  }, [wallet.connected, wallet.publicKey]);

  if (!wallet.connected) {
    return <p>Please connect your wallet to view the profile.</p>;
  }

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-gray-500">No profile created yet. Start by creating your profile.</p>
      </div>
    );
  }

  return (
    <div className="cards">
      <div className="profilecard2">
        <div className="detaili">
          <img
            className="profilelogo"
            src={
              profileData?.image ||
              "https://i.seadn.io/gae/Xed1Pkzstdj2GghgiyGMpJGZBObMFPsociGa9jZT7FlQcxShwo2XiqlNKP-ggQcNYQQnZk4aKLUHh1X_3OHSjaUCmQgfqcB9HStqDq8?auto=format&dpr=1&w=1000"
            }
            alt="Profile"
          />
          <h6>#0006</h6>
        </div>
        <div className="details">
          <div className="firstattribute">
            <p>
              Name: <p>{profileData?.name || "null"}</p>
            </p>
            <p>
              Email: <p>{profileData?.email || "null"}</p>
            </p>
            <p>
              Plan: <p><span className="insure">{profileData?.plan || "null"}</span></p>
            </p>
          </div>
          <div className="firstattribute">
            <p>
              Nationality: <p>{profileData?.nationality || "null"}</p>
            </p>
            <p>
              State: <p>{profileData?.state || "null"}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProfileDisplay;
