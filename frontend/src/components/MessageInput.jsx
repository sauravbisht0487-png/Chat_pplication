// frontend/src/components/MessageInput.jsx
import React, { useState } from "react";
import axiosInstance from "../lib/axios";

const MessageInput = ({ selectedUser, onMessageSent }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
      try {
      const { data } = await axiosInstance.post(`/v1/message/send/${selectedUser._id}`, {
        message: text,
      });
      onMessageSent(data.newMessage);
      setText("");
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-200">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={sending}
        className="bg-indigo-600 text-white text-sm font-medium px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;