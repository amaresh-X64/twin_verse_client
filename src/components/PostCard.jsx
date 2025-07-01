import { useState } from "react";
import { motion } from "framer-motion";

export default function PostCard({ post }) {
  // Reaction counts and toggle state for user reactions.
  const [reactionCounts, setReactionCounts] = useState(
    post.reactions || { like: 0, heart: 0, laugh: 0 }
  );
  const [userReactions, setUserReactions] = useState({
    like: false,
    heart: false,
    laugh: false,
  });
  const [comments, setComments] = useState(post.comments || []);
  const [commentInput, setCommentInput] = useState("");

  const toggleReaction = (type) => {
    const alreadyReacted = userReactions[type];
    const adjustment = alreadyReacted ? -1 : 1;
    setReactionCounts((prev) => ({ ...prev, [type]: prev[type] + adjustment }));
    setUserReactions((prev) => ({ ...prev, [type]: !alreadyReacted }));
  };

  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    setComments([...comments, commentInput]);
    setCommentInput("");
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 mb-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-gray-800">{post.author}</div>
        <div className="text-xs text-gray-500">{post.timestamp}</div>
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.photo && (
        <img
          src={post.photo}
          alt="Post visual"
          className="w-full h-auto rounded-lg mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://dummyimage.com/600x400/ccc/000&text=Image+Not+Found";
          }}
        />
      )}
      <div className="flex space-x-4 mb-2">
        <button
          onClick={() => toggleReaction("like")}
          className={`flex items-center text-sm ${
            userReactions.like
              ? "text-blue-500 font-bold"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          👍 {reactionCounts.like}
        </button>
        <button
          onClick={() => toggleReaction("heart")}
          className={`flex items-center text-sm ${
            userReactions.heart
              ? "text-red-500 font-bold"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          ❤️ {reactionCounts.heart}
        </button>
        <button
          onClick={() => toggleReaction("laugh")}
          className={`flex items-center text-sm ${
            userReactions.laugh
              ? "text-yellow-500 font-bold"
              : "text-gray-600 hover:text-yellow-500"
          }`}
        >
          😂 {reactionCounts.laugh}
        </button>
      </div>
      <div className="mb-2">
        {comments.map((comment, index) => (
          <p key={index} className="text-xs text-gray-500 italic">
            • {comment}
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