import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGray">
      <h2 className="text-3xl font-bold mb-6 text-walmartBlue">Login</h2>
      <form
        onSubmit={(e) => loginUser(e, email, password)}
        className="bg-white p-6 rounded-lg shadow-lg w-80 space-y-4"
      >
        <input
          className="border w-full p-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border w-full p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-walmartBlue text-white w-full py-2 rounded"
        >
          Log In
        </button>
        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-walmartBlue underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
