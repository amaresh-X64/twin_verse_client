import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function FriendCard({ friend }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const toggleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing((prev) => !prev);
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
          <p className="text-xs text-gray-500">{friend.subtitle}</p>
        </div>
      </div>
      <button 
        onClick={toggleFollow}
        className={`px-4 py-2 rounded-full text-sm font-semibold border transition hover:opacity-80 ${
          isFollowing
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-blue-500 border-blue-500"
        }`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </motion.div>
  );
}