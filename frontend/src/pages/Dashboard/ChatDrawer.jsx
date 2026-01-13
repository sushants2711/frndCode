import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { baseUrl } from "../../api/baseUrl";

export const ChatDrawer = ({ onClose }) => {
    const [chatList, setChatList] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchChats = async () => {
        try {
            const res = await axios.get(baseUrl + "/api/v1/chat/get", {
                withCredentials: true,
            });
            if (res.data.success) {
                setChatList(res.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async () => {
        if (!question.trim()) return;

        try {
            setLoading(true);
            await axios.post(
                baseUrl + "/api/v1/chat/add",
                { question },
                { withCredentials: true }
            );
            setQuestion("");
            fetchChats();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
            <div className="w-full md:w-1/3 h-full bg-white flex flex-col">
                {/* Header */}
                <div className="p-4 border-b flex justify-between">
                    <h2 className="font-semibold">AI Assistant</h2>
                    <X onClick={onClose} className="cursor-pointer" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatList.map((chat) => (
                        <div key={chat._id}>
                            <p className="text-blue-600 font-medium">You</p>
                            <p>{chat.question}</p>

                            <p className="text-green-600 font-medium mt-2">AI</p>
                            <p className="bg-gray-100 p-3 rounded">{chat.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                        placeholder="Ask something..."
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 rounded"
                    >
                        {loading ? "..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
};
