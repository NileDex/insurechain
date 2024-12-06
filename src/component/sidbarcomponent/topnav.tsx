import React, { useState } from "react";
import { GiAngelWings } from "react-icons/gi";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import CustomModal from "./custommodal";
import "./Topnav.css";

const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const Header: React.FC = () => {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  return (
    <div className="header">
      <div className="msidebarlogo">
        <img
          src="https://storage.googleapis.com/taikai-storage/images/6c1a0260-4842-11ef-a51e-5717adc69fe1HBX3LN0j_400x400.jpg"
          alt="logo"
        />
      </div>

      <div className="topnavdual">
        {bech32Address && (
          <button name="connect">{shortenAddress(bech32Address)}</button>
        )}
      </div>

      <div className="dropdown-container">
        <div className="profile" onClick={toggleDropdown}>
          <GiAngelWings />
        </div>

        {isDropdownVisible && (
          <div className="dropdown-menu">
            <p>My Profile</p>
            <p>Settings</p>
            <p>Logout</p>
            <Button
              fullWidth
              onClick={toggleModal}
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

      <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
        <h2>Account Details</h2>
        <p>Address: {bech32Address}</p>
        <p>More account information can go here.</p>
      </CustomModal>
    </div>
  );
};

export default Header;
