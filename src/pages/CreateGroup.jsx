import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const availableIcons = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=Group1",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Group2",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Group3",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/groups/", {
        name: groupName,
        icon: groupIcon || availableIcons[0],
      });
      navigate("/groups");
    } catch (err) {
      alert("Failed to create group. Please check your input or try again.");
      console.error(err);
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Create New Group
        </h2>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Group Name:
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Select Group Icon:
          </label>
          <div className="flex space-x-4">
            {availableIcons.map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                alt={`Icon ${idx + 1}`}
                className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                  groupIcon === icon ? "border-blue-600" : "border-transparent"
                }`}
                onClick={() => setGroupIcon(icon)}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full transition"
        >
          Create Group
        </button>
        <button
          type="button"
          onClick={() => navigate("/groups")}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-full transition"
        >
          Cancel
        </button>
      </form>
    </motion.div>
  );
}