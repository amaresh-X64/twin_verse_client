import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Generate Dicebear avatar with random seed for fun diversity
const generateAvatar = (seed) => `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;

const dummyUsers = [
  { name: "Aarav Sharma", savings: 2000 },
  { name: "Diya Patel", savings: 1800 },
  { name: "Kabir Verma", savings: 1600 },
  { name: "Meera Iyer", savings: 1500 },
  { name: "Rohan Mehta", savings: 1400 },
  { name: "Ishita Kapoor", savings: 1300 },
  { name: "Devansh Joshi", savings: 1200 },
  { name: "Ananya Reddy", savings: 1100 },
  { name: "Vivaan Rao", savings: 1000 },
  { name: "Saanvi Nair", savings: 900 },
  { name: "Neel Sharma", savings: 850 },
  { name: "Priya Das", savings: 800 },
  { name: "Aryan Jain", savings: 750 },
].map((user, index) => ({ ...user, avatar: generateAvatar(index + 1) }));

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => setShowAll((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center tracking-tight">Leaderboard</h1>

      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {dummyUsers.slice(0, 3).map((user, index) => (
            <div
              key={index}
              className="bg-slate-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl border border-slate-600"
            >
              <span className="text-3xl mb-2">{medals[index]}</span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
              />
              <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-blue-300">₹{user.savings.toLocaleString()} saved</p>
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
              {dummyUsers.slice(3).map((user, index) => (
                <div
                  key={index + 3}
                  className="bg-slate-700 rounded-xl p-4 flex items-center gap-4 shadow-md hover:bg-slate-600 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-full border-2 border-slate-500 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-blue-300">₹{user.savings.toLocaleString()} saved</p>
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