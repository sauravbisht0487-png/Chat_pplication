// frontend/src/components/ChatContainer.jsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

// Backend origin (not the /api prefix — sockets connect to the server root).
// Matches Backend/.env PORT.
const SOCKET_URL = "http://localhost:8080";

const ChatContainer = ({ selectedUser }) => {
  const { authUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!authUser?._id) return;

    socketRef.current = io(SOCKET_URL, {
      query: { userId: authUser._id },
    });

    socketRef.current.on("newMessage", (newMsg) => {
      if (newMsg.senderId === selectedUser?._id) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [authUser?._id, selectedUser?._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/v1/message/${selectedUser._id}`);
        setMessages(data.messages || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSent = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3 border-b flex items-center gap-3">
        <img
          src={selectedUser?.profilePhoto}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-medium">{selectedUser?.fullName}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading && <p className="text-sm text-gray-400">Loading messages...</p>}
        {!loading && messages.length === 0 && (
          <p className="text-sm text-gray-400">
            No messages yet. Say hello to {selectedUser?.fullName}!
          </p>
        )}
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput selectedUser={selectedUser} onMessageSent={handleMessageSent} />
    </div>
  );
};

export default ChatContainer;