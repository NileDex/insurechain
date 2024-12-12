// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Define the user type
// interface User {
//   name: string;
//   email: string;
//   _id: string;
// }

// // Define the context type
// interface AuthContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   logout: () => void;
//   isLoading: boolean;
// }

// // Create the context
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   setUser: () => {},
//   logout: () => {},
//   isLoading: true,
// });

// // Provider component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check for existing token on initial load
//   useEffect(() => {
//     const checkLoggedIn = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get("/get-user");
//         setUser(response.data);
//       } catch (error) {
//         console.log("No logged-in user");
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkLoggedIn();
//   }, []);


//   const logout = async () => {
//     try {
//       // Optional: Call backend logout endpoint if you have one
//       await axios.post("/logout");
//     } catch (error) {
//       console.error("Logout error", error);
//     } finally {
//       setUser(null);
//       navigate("/");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the auth context
// export const useAuth = () => useContext(AuthContext);

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// Define the user type
interface User {
  name: string;
  email: string;
  _id: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  logout: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const storedUser = localStorage.getItem("user");

    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await axios.post("/tokenIsValid", null, {
            headers: { "x-auth-token": token },
          });

          if (response.data === true && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            // Clear invalid token
            localStorage.removeItem("auth-token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Token validation failed", error);
          localStorage.removeItem("auth-token");
          localStorage.removeItem("user");
        }
      }
    };

    checkTokenValidity();
  }, []);

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};