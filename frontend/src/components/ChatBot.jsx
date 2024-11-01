import React, { useEffect, useRef, useState } from 'react';
import { FiCopy } from 'react-icons/fi'; // Importing copy icon from react-icons

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null); // Reference for auto-scrolling

    const sendMessage = async () => {
        if (input.trim() === "") return;

        // Adding user's message
        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: input }),
            });

            const data = await response.json();
            const botMessage = { sender: "bot", text: data.response };

            // Adding bot's message
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setInput(""); // Clear the input after sending
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => console.error("Failed to copy: ", err));
    };

    // Function to handle key presses
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) { // Allow Shift+Enter for new line
            event.preventDefault(); // Prevent the default behavior of Enter key
            sendMessage();
        }
    };

    // Auto-scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-180 mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">ChatBot</h3>
            <div className="h-60 overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <p className={`font-semibold ${msg.sender === "user" ? "text-blue-600" : "text-green-600"}`}>
                            {msg.sender === "user" ? "You" : "Bot"}:
                        </p>
                        <div className={`relative inline-block ${msg.sender === "bot" ? "p-2 bg-gray-200 rounded-md" : ""}`}>
                            <span className={`block p-2 ${msg.sender === "bot" ? "bg-gray-200 rounded-md" : ""}`}>{msg.text}</span>
                            {msg.sender === "bot" && (
                                <button
                                    onClick={() => copyToClipboard(msg.text)}
                                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                                    aria-label="Copy to clipboard"
                                >
                                    <FiCopy />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} /> {/* Empty div to scroll to */}
            </div>
            <div className="flex mt-4">
                <textarea
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress} // Send message on Enter
                    placeholder="Type a message..."
                    className="flex-grow p-2 border border-gray-300 rounded-md resize-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBot;
