import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const location = useLocation();
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Twin Techies",
      icon: "https://api.dicebear.com/7.x/bottts/svg?seed=Group1",
      members: ["Twin A", "Twin B"],
      admin: "You",
    },
  ]);

  // Check if a new group has been passed from CreateGroup
  useEffect(() => {
    if (location.state?.newGroup) {
      const newGroup = location.state.newGroup;
      if (!groups.some((g) => g.id === newGroup.id)) {
        setGroups((prev) => [...prev, newGroup]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Groups</h1>
        <button
          onClick={() => navigate("/create-group")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Create Group
        </button>
      </div>
      {groups.map((group) => (
        <motion.div
          key={group.id}
          className="bg-white rounded-xl shadow p-4 flex items-center justify-between mb-4 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/group-details", { state: { group } })}
        >
          <div className="flex items-center space-x-4">
            <img
              src={group.icon}
              alt={group.name}
              className="w-12 h-12 rounded-full border"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://api.dicebear.com/7.x/bottts/svg?seed=default";
              }}
            />
            <div>
              <p className="font-semibold text-gray-800">{group.name}</p>
              <p className="text-xs text-gray-500">Admin: {group.admin}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Request to join group feature coming soon!");
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Join
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}
