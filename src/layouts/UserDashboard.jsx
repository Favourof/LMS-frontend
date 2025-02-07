import { Outlet } from "react-router-dom";
import UserSizebar from "../components/UserSizebar";

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSizebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
