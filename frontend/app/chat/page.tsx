"use client";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { MDBCardFooter } from "mdb-react-ui-kit";


export default function ChatUI() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true); // Set loading to true when request starts

    try {
      const response = await axios.post("/api/chat", { messages: updatedMessages });
      setMessages([...updatedMessages, response.data]);
    } catch (error) {
      alert(error);
      console.error("Chatbot error:", error);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <>
    <h1 style={{textAlign:"center"}}>Chat with us </h1>
    <div className="bg-white shadow-lg rounded-lg p-4" style={{ width: "70vw", marginLeft: "7vw", marginTop: "5vh" }}>
      <div className="overflow-y-auto border-b p-2" style={{ height: "500px" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2.5 my-3 rounded ${
              msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
            }`}
          >
            {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
          </div>
        ))}
        {loading && (
          <div className="p-2.5 my-3 rounded bg-gray-100 text-black">
            <span>...</span> {/* Loading message */}
          </div>
        )}
      </div>
      <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
          alt="avatar 3"
          style={{ width: "40px", height: "100%" }}
        />
       
        <input
          style={{ margin: "5px", fontSize: "16px" }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control form-control-lg"
          id="exampleFormControlInput1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type message"
        />
      </MDBCardFooter>
    </div>
    </>
  );
}
