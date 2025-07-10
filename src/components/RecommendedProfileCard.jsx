export default function RecommendedProfileCard({ profile, onFollow }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-800">@{profile.username}</p>
        <p className="text-sm text-gray-500">{profile.name}</p>
      </div>
      <button
        onClick={() => onFollow(profile.username)} // 👈 send username
        className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full"
      >
        Follow
      </button>
    </div>
  );
}
