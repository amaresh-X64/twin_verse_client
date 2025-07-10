import { useEffect, useState, useRef } from "react";
import { db } from "../utils/firebase";
import { ref, push, onValue } from "firebase/database";
import { motion } from "framer-motion";

export default function MyFriends() {
  const [followed, setFollowed] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("followedFriends");
    setFollowed(stored ? JSON.parse(stored) : []);
  }, []);

  // Load messages for selected friend
  useEffect(() => {
    if (!selectedFriend) return;
    const chatId = selectedFriend.id || selectedFriend.name;
    const messagesRef = ref(db, `chat/${chatId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgList = Object.entries(data)
        .map(([key, value]) => ({ ...value, _key: key }))
        .sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgList);
    });
    return () => unsubscribe();
  }, [selectedFriend]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedFriend || input.trim() === "") return;
    const chatId = selectedFriend.id || selectedFriend.name;
    const messagesRef = ref(db, `chat/${chatId}`);
    push(messagesRef, {
      text: input,
      timestamp: Date.now(),
      author: "You",
    });
    setInput("");
  };

  return (
    <motion.div
      className="min-h-screen flex bg-gradient-to-br from-white to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Friends List */}
      <div className="w-full max-w-xs bg-white border-r p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4 text-blue-900">My Friends</h2>
        {followed.length === 0 && (
          <div className="text-gray-500">You haven't followed anyone yet.</div>
        )}
        {followed.map((friend) => (
          <div
            key={friend.id}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
              selectedFriend && selectedFriend.id === friend.id
                ? "bg-blue-100"
                : "hover:bg-blue-50"
            }`}
            onClick={() => setSelectedFriend(friend)}
          >
            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-bold">{friend.name}</div>
              <div className="text-xs text-gray-500">{friend.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!selectedFriend ? (
          <div className="text-gray-400 text-xl">Select a friend to chat</div>
        ) : (
          <div className="bg-white shadow-xl w-full max-w-md flex flex-col h-[80vh] m-8 rounded-3xl">
            <div className="bg-green-600 text-white text-xl font-bold px-6 py-4 rounded-t-3xl text-center shadow">
              🟢 Chat with {selectedFriend.name}
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-green-50" style={{ minHeight: 0 }}>
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-10">No messages yet. Start the conversation!</div>
              )}
              {messages.map((msg) => {
                const isMe = msg.author === "You";
                return (
                  <div
                    key={msg._key}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl shadow
                        ${isMe
                          ? "bg-green-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border rounded-bl-sm"
                        }`}
                    >
                      {!isMe && (
                        <div className="text-xs text-green-700 font-semibold mb-1">{msg.author || "Anon"}</div>
                      )}
                      <div>{msg.text}</div>
                      <div className={`text-[10px] mt-1 text-right ${isMe ? "text-green-100" : "text-gray-400"}`}>
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={sendMessage}
              className="flex p-3 bg-white border-t gap-2 sticky bottom-0"
              style={{ zIndex: 10 }}
            >
              <input
                className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-bold"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}