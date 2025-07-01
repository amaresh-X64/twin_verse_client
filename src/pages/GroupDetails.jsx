import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GroupDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const group = location.state?.group;

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Group not found.
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-500 max-w-md w-full text-center">
        <img
          src={group.icon}
          alt={group.name}
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-600 shadow-lg mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://api.dicebear.com/7.x/bottts/svg?seed=default";
          }}
        />
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{group.name}</h2>
        <p className="text-gray-600 mb-4">Admin: {group.admin}</p>
        <div className="text-left mb-4">
          <p className="font-semibold text-gray-700">Members:</p>
          <ul className="list-disc list-inside text-gray-600">
            {group.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
        {group.admin === "You" && (
          <button
            onClick={() => alert("Admin: Add members feature coming soon!")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full mb-4"
          >
            Add Members
          </button>
        )}
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