import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../utils/api";

export default function PostCard({ post }) {
  const [reactionCounts, setReactionCounts] = useState({ like: 0, love: 0, laugh: 0 });
  const [userReactionType, setUserReactionType] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  // Format created time (simple fallback)
  const timestamp = new Date(post.created_at).toLocaleString();

  useEffect(() => {
  const counts = { like: 0, love: 0, laugh: 0 };
  const currentUsername = localStorage.getItem("username");

  post.reactions?.forEach((r) => {
    counts[r.type] = (counts[r.type] || 0) + 1;
    if (r.user?.username === currentUsername) {
      setUserReactionType(r.type);
    }
    });

    setReactionCounts(counts);
    setComments(post.comments || []);
  }, [post]);

  const handleReaction = async (type) => {
    if (userReactionType === type) return; // prevent duplicate

    try {
      await API.post("/feed/reactions/", {
        post: post.id,
        type: type,
      });

      setReactionCounts((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
        [userReactionType]: userReactionType ? prev[userReactionType] - 1 : prev[userReactionType],
      }));
      setUserReactionType(type);
    } catch (err) {
      console.error("Failed to react:", err);
    }
  };

  const handleAddComment = async () => {
    if (commentInput.trim() === "") return;
    try {
      const res = await API.post("/feed/comments/", {
        post: post.id,
        comment: commentInput,
      });
      setComments([...comments, res.data]);
      setCommentInput("");
    } catch (err) {
      console.error("Failed to comment:", err);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 mb-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-gray-800">
          {post.user?.username || post.author || "Unknown"}
        </div>
      <div className="text-xs text-gray-500">{timestamp}</div>
      </div>
      <p className="text-gray-700 mb-4">{post.caption}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post visual"
          className="w-full h-auto rounded-lg mb-4"
        />
      )}

      {/* Reactions */}
      <div className="flex space-x-4 mb-2">
        {["like", "love", "laugh"].map((type) => (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            className={`text-sm ${
              userReactionType === type
                ? "font-bold text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {type === "like" && "👍"}
            {type === "love" && "❤️"}
            {type === "laugh" && "😂"} {reactionCounts[type] || 0}
          </button>
        ))}
      </div>

      {/* Comments */}
      <div className="mb-2">
        {comments.map((c, i) => (
          <p key={i} className="text-xs text-gray-600 italic">
            • <strong>{c.user?.username || "User"}:</strong> {c.comment}
          </p>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow border border-gray-300 rounded-l-full px-3 py-1 focus:outline-none"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-r-full"
        >
          Post
        </button>
      </div>
    </motion.div>
  );
}
