"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://n8n.example.com/webhook/logistics-chat";

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your Mitrax Logistics Assistant. I'm here to help you track shipments, optimize routes, or analyze delivery performance. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Logic for real n8n connection
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            let botText = "I'm having trouble connecting to the server.";

            if (response.ok) {
                const data = await response.json();
                botText = data.output || data.text || data.message || "Received response from n8n.";
            } else {
                if (N8N_WEBHOOK_URL.includes("example.com")) {
                    botText = "I assume you haven't configured the n8n Webhook URL yet. Please check the configuration. (Simulated Response)";
                }
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date()
            }]);

        } catch (error) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    text: "This is a demo response. Please configure NEXT_PUBLIC_N8N_WEBHOOK_URL in your environment to connect to your real n8n agent.",
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden relative group">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500"></div>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700"></div>

            {/* Header */}
            <div className="p-6 border-b border-slate-700/50 flex flex-col justify-center items-center relative z-10 bg-slate-900/30">
                <div className="p-3 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-2xl shadow-lg mb-3 shadow-indigo-500/20">
                    <Bot size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Mitrax AI Agent</h2>
                <div className="flex items-center gap-1.5 mt-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Active & Ready</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        {msg.sender === 'bot' && (
                            <div className="mr-3 flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                                    <Bot size={14} className="text-sky-400" />
                                </div>
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-br-none shadow-indigo-500/10'
                                : 'bg-slate-800/80 backdrop-blur-md text-slate-200 border border-slate-700/50 rounded-bl-none'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            <p className={`text-[10px] mt-2 opacity-60 ${msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="mr-3 flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                                <Bot size={14} className="text-sky-400" />
                            </div>
                        </div>
                        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 rounded-bl-none flex items-center gap-3">
                            <Loader2 size={18} className="animate-spin text-sky-400" />
                            <span className="text-sm text-slate-400 font-medium">Processing your request...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-slate-900/40 border-t border-slate-700/50 backdrop-blur-md">
                <div className="relative flex items-center gap-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <Sparkles size={18} />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about detailed analytics, shipments, or driver status..."
                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl pl-12 pr-14 py-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500 shadow-inner"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-center text-xs text-slate-500 mt-3 font-medium">Mitrax AI can make mistakes. Please verify important shipment data.</p>
            </div>
        </div>
    );
};

export default ChatInterface;
