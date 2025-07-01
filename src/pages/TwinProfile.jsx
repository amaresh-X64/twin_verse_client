import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TwinProfile() {
  const [twin, setTwin] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("twinProfile"));
    const normalize = (val) => (Array.isArray(val) ? val : typeof val === "string" ? [val] : []);

    if (stored) {
      stored.favCategory = normalize(stored.favCategory);
      stored.shoppingTime = normalize(stored.shoppingTime);
      stored.interests = normalize(stored.interests);
      setTwin(stored);
    }
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem("twinProfile", JSON.stringify(twin));
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (["shoppingTime", "interests", "favCategory"].includes(name) && type === "checkbox") {
      const current = Array.isArray(twin[name]) ? twin[name] : [];
      const newValues = checked ? [...current, value] : current.filter((item) => item !== value);
      setTwin({ ...twin, [name]: newValues });
    } else {
      setTwin({ ...twin, [name]: value });
    }
  };

  if (!twin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Twin profile not found 😢
      </div>
    );
  }

  const interestOptions = ["Tech", "Gaming", "Music", "Travel", "Art", "Fitness"];
  const shoppingOptions = ["Morning", "Afternoon", "Evening"];
  const categoryOptions = ["Electronics", "Apparel", "Home & Garden", "Books", "Beauty", "Sports"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 tracking-tight">Your Twinverse Profile</h1>

      {/* Twin Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-2xl max-w-2xl w-full flex flex-col items-center border border-gray-700">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg">
            <img
              src={twin.avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full border-4 border-gray-900"
            />
          </div>
        </div>

        {editing ? (
          <>
            <input
              name="name"
              value={twin.name}
              onChange={handleChange}
              className="mb-4 px-4 py-2 rounded bg-gray-700 text-white w-full"
              placeholder="Name"
            />
            <input
              name="catchphrase"
              value={twin.catchphrase}
              onChange={handleChange}
              className="mb-6 px-4 py-2 rounded bg-gray-700 text-white w-full"
              placeholder="Catchphrase"
            />

            <label className="block mb-2 text-sm">Style</label>
            <select
              name="style"
              value={twin.style}
              onChange={handleChange}
              className="mb-4 px-4 py-2 rounded bg-gray-700 text-white w-full"
            >
              <option>Minimalist</option>
              <option>Trendy</option>
              <option>Avant-garde</option>
              <option>Casual</option>
              <option>Luxury</option>
              <option>Premium</option>
            </select>

            <label className="block mb-2 text-sm">Favorite Categories</label>
            <div className="mb-4 flex flex-wrap gap-3">
              {categoryOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="favCategory"
                    value={option}
                    checked={twin.favCategory.includes(option)}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>

            <label className="block mb-2 text-sm">Shopping Time</label>
            <div className="mb-4 flex flex-wrap gap-3">
              {shoppingOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="shoppingTime"
                    value={option}
                    checked={twin.shoppingTime.includes(option)}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>

            <label className="block mb-2 text-sm">Reaction</label>
            <select
              name="reaction"
              value={twin.reaction}
              onChange={handleChange}
              className="mb-4 px-4 py-2 rounded bg-gray-700 text-white w-full"
            >
              <option value="analytical">Careful & Calculated</option>
              <option value="spontaneous">Quick to Act</option>
            </select>

            <label className="block mb-2 text-sm">Interests</label>
            <div className="mb-6 flex flex-wrap gap-3">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={twin.interests.includes(interest)}
                    onChange={handleChange}
                  />
                  {interest}
                </label>
              ))}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-full shadow hover:bg-gray-700"
              >
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center">{twin.name}</h2>
            <p className="text-lg italic text-gray-400 text-center mb-6">"{twin.catchphrase}"</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <TwinTag label="Style" value={twin.style} />
              <TwinTag label="Favorite Categories" value={twin.favCategory.join(", ")} />
              <TwinTag
                label="Reaction Type"
                value={twin.reaction === "analytical" ? "Careful & Calculated" : "Quick to Act"}
              />
              <TwinTag
                label="Shopping Time"
                value={twin.shoppingTime.join(", ") || "Anytime"}
              />
            </div>

            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold text-gray-400 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {twin.interests.length > 0 ? (
                  twin.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">None selected</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => navigate("/recommendations")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow transition"
              >
                🛍️ View Recommendations
              </button>
              <button
                onClick={() => setEditing(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full shadow transition"
              >
                ✏️ Edit Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TwinTag({ label, value }) {
  return (
    <div className="bg-gray-700 rounded-xl p-4 text-center shadow">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
