import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

export default function CreatePost() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      await API.post("/feed/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/feed"); // Navigate back to feed
    } catch (err) {
      setError("Failed to create post. Try again.");
      console.error("Post creation failed:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📝 Create a Post</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              id="caption"
              rows="3"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="What's on your mind?"
              maxLength={150}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-blue-600 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
            >
              Post
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
