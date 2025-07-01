import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Feed() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "TwinVerse Feed";
  }, []);

  // Updated dummy posts data with Walmart signature blue
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Twin A",
      content: "Just bought a cool gadget at Walmart!",
      timestamp: "2 hours ago",
      reactions: { like: 5, heart: 2, laugh: 1 },
      photo:
        "https://dummyimage.com/600x400/000/fff&text=Walmart+Gadget",
      comments: ["Awesome!", "Congrats!"],
    },
    {
      id: 2,
      author: "Twin B",
      content: "Check out my new style. #fashion",
      timestamp: "1 day ago",
      reactions: { like: 3, heart: 4, laugh: 0 },
      photo:
        "https://dummyimage.com/600x400/000/fff&text=Fashion+Style",
      comments: ["Love it!", "So stylish!"],
    },
    {
      id: 3,
      author: "Twin C",
      content: "Anyone interested in a group deal? Let's save together.",
      timestamp: "3 days ago",
      reactions: { like: 2, heart: 1, laugh: 5 },
      // No photo for this post, just text
      comments: [],
    },
  ]);

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: "linear-gradient(135deg, #ffffff, #0071ce)",
        backgroundSize: "200% 200%",
        animation: "gradientAnimation 10s ease infinite",
      }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-blue-900 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📰 TwinVerse Feed
      </motion.h1>

      {/* Celeb Twins Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={() => navigate("/celeb-twins")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🌟 View Celeb Twins
        </motion.button>
      </div>

      {/* Render posts */}
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </motion.div>
  );
}
