import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { registerUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lightGray">
      <h2 className="text-3xl font-bold mb-6 text-walmartBlue">Register</h2>
      <form
        onSubmit={(e) => registerUser(e, email, password)}
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
          className="bg-walmartYellow text-black w-full py-2 rounded font-semibold"
        >
          Register
        </button>
        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-walmartBlue underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
