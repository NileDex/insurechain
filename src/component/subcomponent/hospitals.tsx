import "./css/hospital.css";
import { FaMapMarkedAlt } from "react-icons/fa";
const Hospital = () => {
  return (
    <>
      <div className="hospital-cont">
        <div className="subtitle">
          <h3>View Registered Hospital</h3>
        </div>
        <div className="hospitalcontainer">
          <div className="hospitalcard1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-v1XeB-_CgykAEp9EVBeBZ5SKNQKek06Qw&s"
              alt="hospital1"
              className="hospitalcard-image"
            />
            <div className="header-text">
                <h4>Federal Treaching Hospital</h4>
                <p>Lagos, Nigeria</p>
                <div className="address">
                <button>Copy Address</button>
                XION/ADDRESS
                </div>
                <div className="subadd">
                    <p className="terms">Read Companhy Terms and Condition</p>
                    <p className="map"><FaMapMarkedAlt /></p>
                </div>
            </div>
          </div>
          <div className="hospitalcard1">
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipPBTpbqbpSUIedLsv6GIGz4NVtbzdzv3c8INq3N=s1360-w1360-h1020"
              alt="hospital1"
              className="hospitalcard-image"
            />
            <div className="header-text">
                <h4>General Hospital</h4>
                <p>Odan Lagos</p>
                <div className="address">
                <button>Copy Address</button>
                XION/ADDRESS
                </div>
                <div className="subadd">
                    <p className="terms">Read Companhy Terms and Condition</p>
                    <p className="map"><FaMapMarkedAlt /></p>
                </div>
            </div>
          </div>
          <div className="hospitalcard1">
            <img
              src="https://www.lstmed.ac.uk/sites/default/files/centre/lai-1918-57b63ad95f5c0.jpg"
              alt="hospital1"
              className="hospitalcard-image"
            />
            <div className="header-text">
                <h4>Massey Street Children's Hospital </h4>
                <p>Lagos, Nigeria</p>
                <div className="address">
                <button>Copy Address</button>
                XION/ADDRESS
                </div>
                <div className="subadd">
                    <p className="terms">Read Companhy Terms and Condition</p>
                    <p className="map"><FaMapMarkedAlt /></p>
                </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Hospital;
