import React from 'react';
import ChatBot from './components/chatBot';


function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <h1 className="text-2xl font-bold mb-4">Welcome to Chatbot</h1>
            <ChatBot />
        </div>
    );
}

export default App;
