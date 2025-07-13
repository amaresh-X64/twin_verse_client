import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";

const PRODUCT_LIST = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Tech",
    image: "https://www.google.com/imgres?q=noise%20cancelling%20lamp&imgurl=https%3A%2F%2Fwww.datocms-assets.com%2F88108%2F1680535102-ps_buzzijetstanding_0303.jpg%3Fauto%3Dformat%26fit%3Dclip%26h%3D2000%26w%3D2000&imgrefurl=https%3A%2F%2Fwww.buzzi.space%2Finspiration%2Ftimeless-sound-absorbing-lighting-solutions&docid=PI17pR3eWhIB5M&tbnid=7V71e9PAP9P1NM&vet=12ahUKEwix-f-j9rmOAxXsbmwGHQsdBuQQM3oFCIUBEAA..i&w=2000&h=1333&hcb=2&ved=2ahUKEwix-f-j9rmOAxXsbmwGHQsdBuQQM3oFCIUBEAA ",
    tags: ["Tech", "Electronics", "Minimalist"],
    reason: "Because you're into Tech 🎧",
  },
  {
    id: 2,
    name: "Sneaker Drop - Limited Edition",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1600180758890-6c0c622fa3e2",
    tags: ["Apparel", "Trendy", "Fitness"],
    reason: "Your style screams streetwear 👟",
  },
  {
    id: 3,
    name: "Smart Plant Pot",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1582034983033-8a9df49c61e1",
    tags: ["Home & Garden", "Art", "Minimalist"],
    reason: "For your aesthetic & chill vibe 🌱",
  },
  {
    id: 4,
    name: "Resistance Band Set",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1583454110550-c7f5c2ab2032",
    tags: ["Fitness", "Wellness"],
    reason: "Built for your fitness journey 💪",
  },
  {
    id: 5,
    name: "Noise-Cancelling Lamp",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1602343160721-b5e28c3b4e1e",
    tags: ["Tech", "Home & Garden"],
    reason: "Smart home upgrade for tech lovers 💡",
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    tags: ["Fitness", "Wellness"],
    reason: "Perfect for your daily yoga 🧘",
  },
  {
    id: 7,
    name: "Minimalist Desk Lamp",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    tags: ["Minimalist", "Home & Garden"],
    reason: "Brighten up your workspace ✨",
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    tags: ["Tech", "Music"],
    reason: "For your music on the go 🎵",
  },
  {
    id: 9,
    name: "Eco Water Bottle",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    tags: ["Fitness", "Wellness", "Minimalist"],
    reason: "Stay hydrated sustainably 💧",
  },
  {
    id: 10,
    name: "Artisan Coffee Set",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    tags: ["Home & Garden", "Art"],
    reason: "Brew like a barista ☕",
  },
  {
    id: 11,
    name: "Smart Watch",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    tags: ["Tech", "Fitness"],
    reason: "Track your fitness in style ⌚",
  },
  {
    id: 12,
    name: "Trendy Hoodie",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    tags: ["Apparel", "Trendy"],
    reason: "Stay cozy and cool 😎",
  },
  {
    id: 13,
    name: "Wireless Charger",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    tags: ["Tech", "Minimalist"],
    reason: "Declutter your desk 🔋",
  },
  {
    id: 14,
    name: "Running Shoes",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
    tags: ["Fitness", "Apparel"],
    reason: "Hit the track with confidence 🏃",
  },
  {
    id: 15,
    name: "Decorative Throw Pillow",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    tags: ["Home & Garden", "Art"],
    reason: "Add a pop of color to your room 🎨",
  },
  {
    id: 16,
    name: "Fitness Tracker",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    tags: ["Tech", "Fitness"],
    reason: "Monitor your progress 📈",
  },
  {
    id: 17,
    name: "Classic Denim Jacket",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    tags: ["Apparel", "Trendy"],
    reason: "Timeless fashion staple 👖",
  },
  {
    id: 18,
    name: "Aromatherapy Diffuser",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    tags: ["Home & Garden", "Wellness"],
    reason: "Relax and unwind at home 🌸",
  },
  {
    id: 19,
    name: "Graphic Tee",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    tags: ["Apparel", "Art"],
    reason: "Express yourself with art 👕",
  },
  {
    id: 20,
    name: "Portable Blender",
    category: "Tech",
    image: "https://stock.adobe.com/in/search?k=portable+blender&asset_id=1287016264",
    tags: ["Tech", "Fitness", "Wellness"],
    reason: "Smoothies anywhere, anytime 🥤",
  },
  // Add more if needed
];

const CATEGORIES = [
  "All",
  "Tech",
  "Apparel",
  "Home & Garden",
  "Fitness",
  "Wellness",
  "Minimalist",
  "Trendy",
  "Art",
  "Music",
  "Electronics",
];

export default function Recommendations() {
  const [twin, setTwin] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- AUTH CHECK ---
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  // ------------------

  // Try backend first, fallback to frontend logic
  useEffect(() => {
    const fetchTwinAndProducts = async () => {
      setLoading(true);
      try {
        // Fetch twin profile
        let twinProfile = null;
        try {
          const twinRes = await API.get("/twin/profile/");
          twinProfile = twinRes.data;
        } catch {
          twinProfile = JSON.parse(localStorage.getItem("twinProfile"));
        }
        setTwin(twinProfile);

        // Try backend recommendations
        let backendProducts = [];
        try {
          const recRes = await API.get("/recommendations/");
          if (Array.isArray(recRes.data) && recRes.data.length > 0) {
            backendProducts = recRes.data;
          }
        } catch {
          // ignore error, fallback to frontend
        }
        setProducts(backendProducts.length > 0 ? backendProducts : PRODUCT_LIST);
      } finally {
        setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
        setLoading(false);
      }
    };
    fetchTwinAndProducts();
  }, []);

  const updateWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    const newWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  // Filtering logic
  const getPersonalizedProducts = () => {
    if (!twin) return [];
    // Use twin's interests, favCategory, style, etc.
    const { interests = [], favCategory, style } = twin;
    return products.filter((p) => {
      if (filter !== "All" && p.category !== filter && !p.tags.includes(filter)) {
        return false;
      }
      // Personalization: match if any twin attribute matches product tags
      const matches =
        (interests && interests.some((i) => p.tags.includes(i))) ||
        (favCategory && p.tags.includes(favCategory)) ||
        (style && p.tags.includes(style));
      return matches || filter !== "All";
    });
  };

  const personalized = getPersonalizedProducts();

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
        <button
          onClick={() => navigate("/wishlist")}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full shadow transition ml-4"
        >
          ❤️ View Wishlist
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-8 justify-center flex-wrap">
        {CATEGORIES.map((cat) => (
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

      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-10">Loading your recommendations...</p>
      ) : twin ? (
        personalized.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalized.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: product.id * 0.05 }}
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
