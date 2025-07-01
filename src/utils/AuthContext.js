import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const loginUser = async (e, email, password) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/token/", {
        email,
        password,
      });
      localStorage.setItem("access_token", res.data.access);
      navigate("/profile");
    } catch (err) {
      alert("Login failed 💀");
    }
  };

  const registerUser = async (e, email, password) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/register/", {
        email,
        password,
      });
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      alert("Register failed 🤕");
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
