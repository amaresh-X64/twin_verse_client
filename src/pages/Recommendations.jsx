import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Recommendations() {
  const [twin, setTwin] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const storedTwin = JSON.parse(localStorage.getItem("twinProfile"));
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setTwin(storedTwin);
    setWishlist(storedWishlist);
  }, []);

  const updateWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    const newWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };
  //const handleWishlist = (product) => {
  //const current = JSON.parse(localStorage.getItem("wishlist")) || [];
  //const updated = [...current, product];
  //localStorage.setItem("wishlist", JSON.stringify(updated));
//};


  const getPersonalizedProducts = (twin) => {
    if (!twin) return [];

    const { interests = [], favCategory, style } = twin;

    const baseProducts = [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1585386959984-a415522c4260",
        match: interests.includes("Tech") || favCategory === "Electronics",
        reason: "Because you're into Tech 🎧",
      },
      {
        id: 2,
        name: "Sneaker Drop - Limited Edition",
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1600180758890-6c0c622fa3e2",
        match: style === "Trendy" || interests.includes("Fitness"),
        reason: "Your style screams streetwear 👟",
      },
      {
        id: 3,
        name: "Smart Plant Pot",
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1582034983033-8a9df49c61e1",
        match: interests.includes("Art") || favCategory === "Home & Garden",
        reason: "For your aesthetic & chill vibe 🌱",
      },
      {
        id: 4,
        name: "Resistance Band Set",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1583454110550-c7f5c2ab2032",
        match: interests.includes("Fitness"),
        reason: "Built for your fitness journey 💪",
      },
      {
        id: 5,
        name: "Noise-Cancelling Lamp",
        category: "Tech",
        image: "https://images.unsplash.com/photo-1602343160721-b5e28c3b4e1e",
        match: favCategory === "Electronics" || style === "Minimalist",
        reason: "Minimalist tech — your twin would love it ✨",
      },
    ];

    const filtered = baseProducts.filter((p) => p.match);
    if (filter === "All") return filtered;
    return filtered.filter((p) => p.category === filter);
  };

  const personalized = getPersonalizedProducts(twin);
  const categories = ["All", "Tech", "Apparel", "Home & Garden", "Fitness"];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700">Your Daily Picks 🛍️</h1>
        <button
  onClick={() => navigate("/twin")}
  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
>
  View Twin Profile
</button>
<div className="flex justify-center mb-6">
  <button
    onClick={() => navigate("/wishlist")}
    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full shadow transition"
  >
    ❤️ View Wishlist
  </button>
</div>


      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {twin ? (
        personalized.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalized.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: product.id * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.reason}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      View Product
                    </button>
                    <button
                      onClick={() => updateWishlist(product)}
                      className={`text-sm font-semibold px-3 py-1 rounded-full transition ${
                        wishlist.find((item) => item.id === product.id)
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {wishlist.find((item) => item.id === product.id) ? "♥ Wishlisted" : "♡ Wishlist"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No matching picks for your twin yet 😅
          </p>
        )
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">Loading your twin data...</p>
      )}
    </div>
  );
}
