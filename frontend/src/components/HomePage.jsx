
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import NoChatSelected from "./NoChatSelected";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen flex">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      {selectedUser ? <ChatContainer selectedUser={selectedUser} /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;
