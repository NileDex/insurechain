import React from "react";
import { Link } from "react-router-dom";
import robo from "../../assets/robo.png";
import "./404.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div>
        {/* Use the imported `robo` image */}
        <img src={robo} alt="Robot Illustration" />
      </div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button>
        <Link to="/" className="">
          Go Back to Login
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
