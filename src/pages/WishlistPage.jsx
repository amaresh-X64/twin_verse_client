import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const handleClearWishlist = () => {
    localStorage.removeItem("wishlist");
    setWishlist([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        📝 Your Wishlist
      </h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Your wishlist is empty 😢</p>
      )}

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/recommendations")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
        >
          🔙 Back to Recommendations
        </button>
        {wishlist.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="bg-red-500 text-white px-6 py-3 rounded-full shadow hover:bg-red-600 transition"
          >
            🗑️ Clear Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
