import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="p-4 text-2xl text-walmartBlue">
      👤 Profile Page
      <div className="mt-4">
        <Link
          to="/friends-follow"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Friends & Follow
        </Link>
      </div>
    </div>
  );
}
