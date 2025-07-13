import { useEffect, useState } from "react";
import API from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Alice",
    savings: 1200,
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Bob",
    savings: 950,
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Charlie",
    savings: 800,
  },
  {
    id: 4,
    name: "Daisy",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Daisy",
    savings: 700,
  },
  {
    id: 5,
    name: "Eve",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Eve",
    savings: 600,
  },
];

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/feed/leaderboard/");
        // Check if data is a non-empty array and has at least one user with a name
        if (
          Array.isArray(res.data) &&
          res.data.length > 0 &&
          res.data.some((u) => u.name && u.avatar && u.savings !== undefined)
        ) {
          setUsers(res.data);
        } else {
          setUsers(dummyUsers);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
        setUsers(dummyUsers);
      }
    };
    fetchLeaderboard();
  }, []);

  const handleToggle = () => setShowAll((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-10 text-blue-400">Leaderboard</h1>
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {users.slice(0, 3).map((user, index) => (
            <div
              key={user.id}
              className={`rounded-2xl p-6 flex flex-col items-center shadow-xl ${
                index === 0
                  ? "bg-yellow-400 text-black"
                  : index === 1
                  ? "bg-gray-300 text-black"
                  : "bg-orange-300 text-black"
              }`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
              />
              <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-blue-900">
                ₹{(user.savings ?? 0).toLocaleString()} saved
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleToggle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition"
          >
            {showAll ? "Hide List" : "See More"}
          </button>
        </div>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-4 max-h-96 overflow-y-auto pr-2 custom-scroll"
            >
              {users.slice(3).map((user, index) => (
                <div
                  key={user.id}
                  className="bg-slate-700 rounded-xl p-4 flex items-center gap-4 shadow-md hover:bg-slate-600 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-full border-2 border-slate-500 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-blue-300">
                      ₹{(user.savings ?? 0).toLocaleString()} saved
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}