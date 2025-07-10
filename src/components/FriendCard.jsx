import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // Make sure this is imported

export default function FriendCard({ friend, onUnfollow }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUnfollow = async (e) => {
    e.stopPropagation(); // Prevent navigating to profile
    setLoading(true);
    try {
      const res = await API.post("/users/follow/", {
        target_username: friend.username,
      });
      console.log(res.data.detail); // Followed or Unfollowed
      onUnfollow(friend.username);  // Trigger update in parent component
    } catch (err) {
      console.error("Unfollow failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const openProfile = () => {
    navigate("/friend-profile", { state: { friend } });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow p-4 flex items-center justify-between mb-4 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={openProfile}
    >
      <div className="flex items-center space-x-4">
        <img
          src={friend.avatar}
          alt="Friend avatar"
          className="w-12 h-12 rounded-full border"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=default";
          }}
        />
        <div>
          <p className="font-semibold text-gray-800">{friend.name}</p>
          <p className="text-xs text-gray-500">{friend.subtitle || "Followed Twin"}</p>
        </div>
      </div>
      <button
        onClick={handleUnfollow}
        disabled={loading}
        className="px-4 py-2 rounded-full text-sm font-semibold border border-blue-500 text-blue-500 bg-white hover:bg-blue-50 transition"
      >
        {loading ? "..." : "Unfollow"}
      </button>
    </motion.div>
  );
}
