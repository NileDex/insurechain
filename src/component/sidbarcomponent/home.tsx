import { Outlet } from "react-router-dom"; 
import Sidebar from "./sidetrack"; 
import Header from "./topnav"; 
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div>
        <Sidebar />
      </div>

      <div className="sub-container">
        <div>
          <Header />
        </div>
        <div className="container">
          <div className="components">
            {/* This is where the nested components (Profile or Claim) will be rendered */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
