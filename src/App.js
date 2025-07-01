import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Groups from "./pages/Groups";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendations from "./pages/Recommendations";
import TwinProfile from "./pages/TwinProfile";
import CelebTwins from "./pages/CelebTwins";
import FriendsFollow from "./pages/FriendsFollow";
import FriendProfile from "./pages/FriendProfile"; // new import
import CreateGroup from "./pages/CreateGroup";
import GroupDetails from "./pages/GroupDetails";

import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <>
      <nav className="bg-walmartBlue text-white px-6 py-4 flex gap-6">
        <Link to="/onboarding">Onboarding</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/twin" element={<TwinProfile />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/celeb-twins" element={<CelebTwins />} />
        <Route path="/friends-follow" element={<FriendsFollow />} />
        <Route path="/friend-profile" element={<FriendProfile />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/group-details" element={<GroupDetails />} />
      </Routes>
    </>
  );
}

export default App;
