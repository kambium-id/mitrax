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
            text: "Halo! Saya adalah Asisten Logistik Mitrax AI. Saya siap membantu Anda melacak pengiriman, mengoptimalkan rute, atau menganalisis kinerja pengiriman. Bagaimana saya bisa membantu Anda hari ini?",
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
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            let botText = "Maaf, saya mengalami masalah koneksi ke server.";

            if (response.ok) {
                const data = await response.json();
                botText = data.output || data.text || data.message || "Menerima respons dari n8n.";
            } else {
                if (N8N_WEBHOOK_URL.includes("example.com")) {
                    botText = "URL n8n Webhook belum dikonfigurasi. Silakan periksa konfigurasi. (Response Simulasi)";
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
                    text: "Ini adalah respons demo. Silakan konfigurasikan NEXT_PUBLIC_N8N_WEBHOOK_URL di environment Anda untuk terhubung ke agen n8n yang sesungguhnya.",
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
        <div className="flex flex-col h-[600px] w-full glass-card rounded-3xl shadow-2xl overflow-hidden relative group border border-teal-500/20">
            {/* Decorative gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 animate-pulse" />

            {/* Ambient glow effects */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/20 transition-all duration-700" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

            {/* Header */}
            <div className="p-6 border-b border-white/10 flex flex-col justify-center items-center relative z-10 bg-gradient-to-b from-purple-500/5 to-transparent">
                <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg mb-3 shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                    <Bot size={32} className="text-white relative z-10" />
                    {/* Icon shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Mitrax AI Agent</h2>
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Aktif & Siap</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth relative z-10">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                        {msg.sender === 'bot' && (
                            <div className="mr-3 flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center border-2 border-teal-400/30 shadow-lg shadow-teal-500/20">
                                    <Bot size={16} className="text-white" />
                                </div>
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-2xl p-4 shadow-lg relative overflow-hidden ${msg.sender === 'user'
                            ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-br-sm shadow-teal-500/20'
                            : 'glass-card text-gray-200 border border-teal-500/20 rounded-bl-sm'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap relative z-10">{msg.text}</p>
                            <p className={`text-[10px] mt-2 opacity-70 relative z-10 ${msg.sender === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                                {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {msg.sender === 'bot' && (
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 opacity-50" />
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-slide-up">
                        <div className="mr-3 flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-purple-400/30 shadow-lg shadow-purple-500/20">
                                <Bot size={16} className="text-white" />
                            </div>
                        </div>
                        <div className="glass-card border border-teal-500/20 rounded-2xl p-4 rounded-bl-sm flex items-center gap-3">
                            <Loader2 size={18} className="animate-spin text-teal-400" />
                            <span className="text-sm text-gray-400 font-medium">Memproses permintaan Anda...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-gradient-to-t from-purple-500/5 to-transparent border-t border-white/10 backdrop-blur-md relative z-10">
                <div className="relative flex items-center gap-2">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400">
                        <Sparkles size={18} />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Tanyakan tentang analitik, pengiriman, atau status driver..."
                        className="w-full glass-card border border-teal-500/30 rounded-xl pl-12 pr-14 py-4 text-sm text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition-all placeholder:text-gray-500 shadow-lg"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-all shadow-lg shadow-teal-500/30 active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-3 font-medium">Mitrax AI dapat membuat kesalahan. Harap verifikasi data pengiriman penting.</p>
            </div>
        </div>
    );
};

export default ChatInterface;
