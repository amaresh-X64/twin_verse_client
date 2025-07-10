import { useEffect, useState, useRef } from "react";
import { db } from "../utils/firebase";
import { ref, push, onValue } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  // Get friend info from navigation state
  const friend = location.state?.friend;

  // Use friend.id if available, else fallback to friend.name
  const chatId = friend?.id || friend?.name;

  useEffect(() => {
    if (!friend) return;
    document.title = `Chat with ${friend.name}`;
    const messagesRef = ref(db, `chat/${chatId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgList = Object.entries(data)
        .map(([key, value]) => ({ ...value, _key: key }))
        .sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgList);
    });
    return () => unsubscribe();
  }, [chatId, friend]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!friend) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        No friend selected for chat.
      </div>
    );
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const messagesRef = ref(db, `chat/${chatId}`);
    push(messagesRef, {
      text: input,
      timestamp: Date.now(),
      author: "You",
    })
      .then(() => {
        console.log("Message sent!");
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
    setInput("");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center p-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-xl w-full max-w-md flex flex-col h-screen">
        <div className="bg-green-600 text-white text-xl font-bold px-6 py-4 rounded-t-3xl text-center shadow">
          🟢 Chat with {friend.name}
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
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-b-3xl transition"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
}