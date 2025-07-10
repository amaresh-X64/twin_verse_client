import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [catchphrase, setCatchphrase] = useState("");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await API.get("/users/me/");
        const twinRes = await API.get("/twin/profile/");
        setUser(userRes.data);
        setCatchphrase(twinRes.data.catchphrase || "");
        setAvatar(twinRes.data.avatar);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await API.put("/twin/profile/", { catchphrase });
      setCatchphrase(res.data.catchphrase);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update catchphrase.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div className="p-4 text-gray-500">Loading...</div>;

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6 mb-6">
        <img
          src={avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
          alt="Avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold text-walmartBlue">{user.name}</h2>
          <p className="text-gray-700">@{user.username}</p>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Catchphrase Editor */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">🗣️ Catchphrase</h3>
        <input
          type="text"
          value={catchphrase}
          onChange={(e) => setCatchphrase(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your catchphrase"
        />
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full mt-4"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

    </div>
  );
}
