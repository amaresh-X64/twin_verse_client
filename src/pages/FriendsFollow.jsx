import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FriendCard from "../components/FriendCard";
import API from "../utils/api";

export default function FriendsFollow() {
  useEffect(() => {
    document.title = "Friends & Follow";
    
    const loadFriends = async () => {
      const data = await fetchFriends();
      if (data) setFriends(data);
      };
    loadFriends();
  }, []);

<<<<<<< HEAD
  const handleUnfollow = (username) => {
  setFriends((prev) => prev.filter((f) => f.username !== username));
  };

  const [friends, setFriends] = useState([
=======
  const [friends] = useState([
>>>>>>> 46b5bc8 (Integerating chat in myfriends)
    {
      id: 1,
      name: "Twin D",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=D",
      subtitle: "Digital Twin",
    },
    {
      id: 2,
      name: "Twin E",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=E",
      subtitle: "Style Guru",
    },
    {
      id: 3,
      name: "Twin F",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=F",
      subtitle: "Tech Enthusiast",
    },
  ]);

  const [followed, setFollowed] = useState(() => {
    const stored = localStorage.getItem("followedFriends");
    return stored ? JSON.parse(stored) : [];
  });

  const handleFollow = (friend) => {
    if (!followed.find((f) => f.id === friend.id)) {
      const updated = [...followed, friend];
      setFollowed(updated);
      localStorage.setItem("followedFriends", JSON.stringify(updated));
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Friends & Follow
      </h1>
      <div className="max-w-xl mx-auto space-y-4">
        {friends.map((friend) => (
<<<<<<< HEAD
          <FriendCard key={friend.id} friend={friend} onUnfollow={handleUnfollow} />
=======
          <div key={friend.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
            <FriendCard friend={friend} />
            <button
              onClick={() => handleFollow(friend)}
              className={`ml-auto px-4 py-2 rounded-full font-bold transition ${
                followed.find((f) => f.id === friend.id)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={!!followed.find((f) => f.id === friend.id)}
            >
              {followed.find((f) => f.id === friend.id) ? "Following" : "Follow"}
            </button>
          </div>
>>>>>>> 46b5bc8 (Integerating chat in myfriends)
        ))}
      </div>
    </motion.div>
  );
}

const fetchFriends=async()=>{
  try{
    const res= await API.get("/users/follow/");
    
    console.log("Friends fetched successfully:", res);
    return res.data;
  }
  catch(err){
    console.error("Failed to fetch friends:", err);
  }
}

