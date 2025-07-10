// src/pages/CelebTwins.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const celebTwins = [
  {
    name: "Ranveer Singh",
    avatar: "/avatars/male_5.png",
    title: "Style Icon",
    picks: [
      {
        name: "Luxury Sneakers",
        image: "https://images.unsplash.com/photo-1606813902784-d1dabf4f3e38?auto=format&fit=crop&w=800&q=80",
        reason: "Bold and fashion-forward – just like Ranveer."
      },
      {
        name: "Designer Jacket",
        image: "https://images.unsplash.com/photo-1618354691320-539c553adfd5?auto=format&fit=crop&w=800&q=80",
        reason: "A statement piece for the spotlight moments."
      }
    ]
  },
  {
    name: "Alia Bhatt",
    avatar: "/avatars/female_2.png",
    title: "Casual Queen",
    picks: [
      {
        name: "Pastel Hoodie",
        image: "https://images.unsplash.com/photo-1618221620466-80b10bcfbd2d?auto=format&fit=crop&w=800&q=80",
        reason: "Soft, trendy, and cozy – Alia vibes."
      },
      {
        name: "Canvas Tote",
        image: "https://images.unsplash.com/photo-1618354691055-57f6d7f59d6b?auto=format&fit=crop&w=800&q=80",
        reason: "Perfect for weekend errands and brunches."
      }
    ]
  },
  {
    name: "Virat Kohli",
    avatar: "/avatars/male_3.png",
    title: "Sporty Star",
    picks: [
      {
        name: "Performance T-Shirt",
        image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80",
        reason: "Engineered for focus and fitness."
      },
      {
        name: "Training Shoes",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        reason: "For those who chase greatness daily."
      }
    ]
  }
];

export default function CelebTwins() {
  const [selectedCeleb, setSelectedCeleb] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12">Celebrity Twins</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {celebTwins.map((celeb, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:bg-gray-700 transition cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedCeleb(celeb)}
          >
            <img
              src={celeb.avatar}
              alt={celeb.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 mb-4"
            />
            <h2 className="text-xl font-bold">{celeb.name}</h2>
            <p className="text-sm text-gray-300">{celeb.title}</p>
            <p className="mt-4 text-blue-400 font-semibold">View Picks →</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCeleb && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCeleb(null)}
          >
            <motion.div
              className="bg-gray-900 p-6 rounded-3xl w-full max-w-xl relative text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">{selectedCeleb.name}'s Picks</h2>
              <div className="grid gap-6">
                {selectedCeleb.picks.map((product, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-blue-600"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-300">{product.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedCeleb(null)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
