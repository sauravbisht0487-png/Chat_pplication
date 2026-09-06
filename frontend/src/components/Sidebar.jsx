// frontend/src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get("/v1/user/");
        setUsers(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <aside className="w-72 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 font-semibold text-gray-800">Chats</div>
      <div className="flex-1 overflow-y-auto">
        {loading && <p className="p-4 text-sm text-gray-400">Loading...</p>}
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition ${
              selectedUser?._id === user._id ? "bg-indigo-50" : ""
            }`}
          >
            <img src={user.profilePhoto} alt={user.fullName} className="w-10 h-10 rounded-full" />
            <span className="text-sm font-medium text-gray-800">{user.fullName}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;