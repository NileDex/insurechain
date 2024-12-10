import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { MdHomeWork } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
const Sidebar: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // On desktop, ensure sidebar is visible
    if (!mobile) {
      setIsActive(false);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        {/* Mobile Toggle Button */}
        <div className="mtop"></div>
        <div className="mobile-toggle">
          {isMobile && (
            <button onClick={handleToggle}>
              <i>//</i>
            </button>
          )}
        </div>
      </div>
      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${isActive && isMobile ? "active" : ""}`}
        onClick={handleOverlayClick}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isActive ? "active" : ""}`} id="sidebar">
        {/* logo */}
        <div className="logo">
          <i>
            <img
              src="https://storage.googleapis.com/taikai-storage/images/6c1a0260-4842-11ef-a51e-5717adc69fe1HBX3LN0j_400x400.jpg"
              className="sidebarlogo"
              alt="logo"
            />
          </i>
        </div>

        {/* menu links */}
        <nav className="menu">
          <h1 className="menu-header">Menu</h1>

          <div className="menu-item nav-active" data-tooltip="Home">
            <Link to="/home/profile">
              {" "}
             
                {" "}
                <MdHomeWork />
                <span>Home</span>
            
            </Link>
          </div>
          <div className="menu-item" data-tooltip="Wallets">
            <Link to="/home/claim">
           
                <FaWallet />
                <span>Wallet</span>
            
            </Link>
          </div>

          <h1 className="menu-header soon!😀">soon!😀</h1>
          {/* <div className="menu-item" data-tooltip="Add">
            <i ></i>
            <span></span>
          </div> */}
        </nav>

        {/* logout */}
        <div className="logout" data-tooltip="Logout">
          <Link to="/">
            <i>
              <IoLogOut />
            </i>
          </Link>
          <span>Logout</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
