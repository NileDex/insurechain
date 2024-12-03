
import { GiAngelWings } from "react-icons/gi";
import { useState } from "react";
import "./Topnav.css";

const Header: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Mock data for wallet balance and profile items
  const walletBalance = "1.234 ETH"; // Replace with actual wallet data if available
  const profileItems = ["My Profile", "Settings", "Logout"];

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="header">
      {/* Logo Section */}
      <div className="msidebarlogo">
        <i>
          <img
            src="https://storage.googleapis.com/taikai-storage/images/6c1a0260-4842-11ef-a51e-5717adc69fe1HBX3LN0j_400x400.jpg"
            alt="logo"
          />
        </i>
      </div>


      {/* Navigation Section */}
      <div className="topnavdual">
        {/* Connect Wallet Button */}
        <button name="connect">Addrxx</button>
      </div>
      <div className="dropdown-container">
        <div className="profile" onClick={toggleDropdown}>
          <p>
            <GiAngelWings />
          </p>
        </div>

        {isDropdownVisible && (
          <div className="dropdown-menu">
            {/* Wallet Balance */}
            <div className="wallet-balance">
              <p>Balance: {walletBalance}</p>
            </div>

            {/* Profile Items */}
            <ul>
              {profileItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
