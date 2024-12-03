import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../src/component/form/loginform"; // Import your LoginForm component
import Home from "../src/component/sidbarcomponent/home"; // Import the Home component
import Profile from "../src/component/subcomponent/profile"; // Profile component
import Claim from "../src/component/subcomponent/claim"; // Claim component
import SignupForm from "./component/form/signup";
import Xion from "./component/form/xion";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for LoginForm */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/xion" element={<Xion/>} />

        {/* Route for Home, which includes Sidebar and Header */}
        <Route path="/home" element={<Home />}>
          {/* Default route for Profile */}
          <Route index element={<Profile />} />

          {/* Nested routes for Profile and Claim */}
          <Route path="profile" element={<Profile />} />
          <Route path="claim" element={<Claim />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
