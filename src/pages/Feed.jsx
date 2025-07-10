import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import RecommendedProfileCard from "../components/RecommendedProfileCard";
import API from "../utils/api";

export default function Feed() {
  const navigate = useNavigate();

  const fallbackPosts = [
    {
      id: 1,
      caption: "👋 Welcome to TwinVerse! Start exploring and connecting with your twins now.",
      created_at: new Date().toISOString(),
      user: { username: "Admin" },
      image: "https://dummyimage.com/600x400/0071ce/ffffff&text=Welcome+to+TwinVerse",
      reactions: [
        { type: "like", user: null },
        { type: "love", user: null },
        { type: "laugh", user: null },
      ],
      comments: [
        { user: { username: "User1" }, comment: "Excited to be here!" },
        { user: { username: "User2" }, comment: "Looks amazing 🔥" },
      ],
    },
  ];

  const [posts, setPosts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    document.title = "TwinVerse Feed";
    fetchRecommendations();
    fetchFeedPosts();
  }, []);

  const fetchFeedPosts = async () => {
    try {
      const res = await API.get("/feed/posts/");
      if (Array.isArray(res.data)) {
        setPosts(res.data); // non-paginated
      } else if (Array.isArray(res.data.results)) {
        setPosts(res.data.results); // paginated
      } else {
        console.warn("Unexpected feed format:", res.data);
        setPosts(fallbackPosts); // fallback on unexpected format
      }
    } catch (err) {
      console.error("Failed to load posts:", err);
      setPosts(fallbackPosts); // use fallback on error
    }
  };


  const fetchRecommendations = async () => {
    try {
      const res = await API.get("/users/discover/");
      setRecommendations(res.data);
    } catch (err) {
      console.error("Failed to load recommendations:", err);
    }
  };

  const handleFollow = async (username) => {
    try {
      await API.post("/users/follow/", { target_username: username });
      fetchRecommendations(); // refresh the sidebar after toggle
      fetchFeedPosts();
    } catch (err) {
      console.error("Follow/unfollow failed:", err);
    }
  };

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

      {/* Main Feed + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed (2/3) */}
        <div className="lg:col-span-2">
          {Array.isArray(posts) ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-600">No posts to show.</p>
          )}
        </div>

        {/* Sidebar (1/3) */}
        <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">🔍 Who to Follow</h2>
          {recommendations.length === 0 ? (
            <p className="text-sm text-gray-500">You're all caught up!</p>
          ) : (
            recommendations.map((profile) => (
              <RecommendedProfileCard
                key={profile.id}
                profile={profile}
                onFollow={handleFollow}
              />
            ))
          )}
        </div>

        <motion.button
          onClick={() => navigate("/create-post")}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl flex items-center justify-center shadow-lg z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label="Create Post"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  );
}
