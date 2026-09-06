// frontend/src/components/Message.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Message = ({ message }) => {
  const { authUser } = useAuth();
  const isSent = message.senderId === authUser._id;

  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
          isSent
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-gray-100 text-gray-800 rounded-bl-sm"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default Message;