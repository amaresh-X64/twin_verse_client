import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function FriendProfile() {
  const location = useLocation();
  const friend = location.state?.friend;
  const navigate = useNavigate();

  if (!friend) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Friend profile not found.
      </div>
    );
  }

  // Dummy preference data if not provided in friend object
  const dummyPreferences = {
    catchphrase: friend.catchphrase || "Living life one twin at a time!",
    style: friend.style || "Casual and trendy",
    interests: friend.interests || ["Tech Gadgets", "Fashion", "Travel"],
    favoriteCategories:
      friend.favoriteCategories || ["Electronics", "Clothing"],
  };

  const handleMessage = () => {
    // Replace with navigation to chat route or model when implemented
    alert("Messaging feature coming soon!");
  };


  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-500 max-w-md w-full text-center">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="w-36 h-36 mx-auto rounded-full border-4 border-blue-600 shadow-lg mb-6"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://api.dicebear.com/7.x/bottts/svg?seed=default";
          }}
        />
        <h2 className="text-3xl font-bold mb-2 text-blue-800">
          {friend.name}
        </h2>
        <p className="text-lg italic text-gray-500 mb-6">{friend.subtitle}</p>

        <div className="text-left mb-4">
          <p className="font-semibold text-gray-700">Catchphrase:</p>
          <p className="text-gray-600">{dummyPreferences.catchphrase}</p>
        </div>
        <div className="text-left mb-4">
          <p className="font-semibold text-gray-700">Style:</p>
          <p className="text-gray-600">{dummyPreferences.style}</p>
        </div>
        <div className="text-left mb-4">
          <p className="font-semibold text-gray-700">Interests:</p>
          <ul className="list-disc list-inside text-gray-600">
            {dummyPreferences.interests.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="text-left mb-6">
          <p className="font-semibold text-gray-700">Favorite Categories:</p>
          <ul className="list-disc list-inside text-gray-600">
            {dummyPreferences.favoriteCategories.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-around mb-6">
          <button
            onClick={handleMessage}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            Message
          </button>
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