import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FriendProfile() {
  const location = useLocation();
  const friend = location.state?.friend;
  const navigate = useNavigate();

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("followedFriends");
    if (stored && friend) {
      const followed = JSON.parse(stored);
      setIsFollowed(!!followed.find((f) => f.id === friend.id));
    }
  }, [friend]);

  if (!friend) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Friend profile not found.
      </div>
    );
  }

  // ...existing dummyPreferences code...

  const handleMessage = () => {
<<<<<<< HEAD
    // Replace with navigation to chat route or model when implemented
    alert("Messaging feature coming soon!");
  };

=======
    navigate("/chat", { state: { friend } });
  };
>>>>>>> 46b5bc8 (Integerating chat in myfriends)

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-500 max-w-md w-full text-center">
        {/* ...existing profile UI... */}
        <div className="flex justify-around mb-6">
          {isFollowed ? (
            <button
              onClick={handleMessage}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow transition"
            >
              Message
            </button>
          ) : (
            <span className="text-gray-400 italic">Follow to chat</span>
          )}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow transition"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
}