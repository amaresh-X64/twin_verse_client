import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const loginUser = async (e, email, password) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mysite-uete.onrender.com/api/token/", {
        email,
        password,
      });
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("access_token", res.data.access);

      const userRes=await API.get("/users/me/");
      localStorage.setItem("username", userRes.data.username);
      const isNewUser = !userRes.data.is_onboarded;
      if(isNewUser){
        navigate("/onboarding");
      }
      else{
        navigate("/feed");
      }
    } catch (err) {
      alert("Login failed 💀");
    }
  };

  const registerUser = async (e, email,username,name, password) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mysite-uete.onrender.com/api/users/register/", {
        email,
        username,
        name,
        password,
      });
      if (res.status === 201 || res.status === 200) {
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
