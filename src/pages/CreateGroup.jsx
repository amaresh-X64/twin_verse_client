import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);

  // Predefined avatar options for group icons
  const availableIcons = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=Group1",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Group2",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Group3",
  ];

  const addMember = () => {
    if (memberInput.trim() !== "") {
      setMembers([...members, memberInput.trim()]);
      setMemberInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      id: Date.now(),
      name: groupName,
      icon: groupIcon || availableIcons[0],
      members,
      admin: "You",
    };
    // Navigate back to Groups and pass the new group within the route state
    navigate("/groups", { state: { newGroup } });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Create New Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              {availableIcons.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt={`Icon ${index + 1}`}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                    groupIcon === icon ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setGroupIcon(icon)}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Add Members:
            </label>
            <div className="flex">
              <input
                type="text"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                className="flex-grow border border-gray-300 rounded-l-md p-2"
                placeholder="Enter member name"
              />
              <button
                type="button"
                onClick={addMember}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {members.map((member, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full transition"
          >
            Create Group
          </button>
        </form>
        <button
          onClick={() => navigate("/groups")}
          className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-full transition"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}