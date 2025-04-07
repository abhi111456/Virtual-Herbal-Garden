import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const ai = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const textResponse = result.response.text(); 

      const botMessage = { role: "assistant", content: textResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4 border">
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <FaRobot className="mr-2 text-blue-500" /> AI Chatbot
      </h2>

      <div className="h-64 overflow-y-auto border p-2 rounded bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded ${msg.role === "user" ? "bg-blue-200 text-right" : "bg-white text-left"}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center border-t pt-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={sendMessage} disabled={loading}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
