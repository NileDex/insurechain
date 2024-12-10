import React, { useState, useEffect } from "react";
import { GiAngelWings } from "react-icons/gi";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { FaWallet } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";
import "./Topnav.css";
import { WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const Header: React.FC = () => {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();

  const wallet = useWallet(); // Use full wallet object to track the connection state

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const [wallet1Connected, setWallet1Connected] = useState(false);
  const [wallet2Connected, setWallet2Connected] = useState(false);

  useEffect(() => {
    // Update wallet1Connected based on Abstraxion wallet (bech32Address)
    setWallet1Connected(!!bech32Address);

    // Update wallet2Connected based on Solana wallet connection
    setWallet2Connected(wallet.connected); // Use the 'connected' property from the wallet object
  }, [bech32Address, wallet.connected]); // Track changes to wallet connection

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  const handleCopy = () => {
    if (bech32Address) {
      navigator.clipboard.writeText(bech32Address);
      setIsNotificationVisible(true);
      setTimeout(() => setIsNotificationVisible(false), 2000); // Hide after 2 seconds
    }
  };

  const getConnectionText = () => {
    if (wallet1Connected && wallet2Connected) {
      return "2/2 Connected";
    }
    if (wallet1Connected || wallet2Connected) {
      return "1/2 Connected";
    }
    return "Connect Wallet";
  };

  return (
    <div className="header">
      {/* Logo Section */}
      <div className="msidebarlogo">
        <img
          src="https://storage.googleapis.com/taikai-storage/images/6c1a0260-4842-11ef-a51e-5717adc69fe1HBX3LN0j_400x400.jpg"
          alt="logo"
        />
      </div>

      {/* Wallet Connection Section */}
      <div className="topnavdual">
        <button
          name="connect"
          onClick={() => toggleDropdown("walletDropdown")}
        >
          <FaWallet />
          {getConnectionText()}
        </button>

        {activeDropdown === "walletDropdown" && (
          <div className="dropdown-menu2">
            <div className="subb">
              {/* Address Display */}
              {bech32Address && (
                <button name="connect" onClick={handleCopy}>
                  <IoCopy />
                  {shortenAddress(bech32Address)}
                </button>
              )}

              <WalletMultiButton className="walletbutton" />
            </div>

            <div className="dubb">
              <h3>Connect Wallet</h3>
              <div className="wallet-list">
                {/* Modal list (wallet options) */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="dropdown-container">
        <div
          className="profile"
          onClick={() => toggleDropdown("profileDropdown")}
        >
          <GiAngelWings />
        </div>

        {activeDropdown === "profileDropdown" && (
          <div className="dropdown-menu">
            <p>My Profile</p>
            <p>Settings</p>
            <p>Logout</p>
            <Button
              fullWidth
              // onClick={toggleModal}
              structure="base"
              style={{ zIndex: 9999 }}
            >
              {bech32Address ? (
                <div className="flex items-center justify-center">
                  VIEW ACCOUNT
                </div>
              ) : (
                "CONNECT"
              )}
            </Button>
          </div>
        )}
      </div>

 

      {/* Notification Section */}
      {isNotificationVisible && (
        <div className="copy-notification">
          <span className="checkmark"></span>
          Address copied to clipboard!
        </div>
      )}
    
    </div>
  );
};

export default Header;
