import React from 'react';
import { MessageSquare, Clock, Zap, TrendingUp } from 'lucide-react';

const ChatHistoryPanel = () => {
    const chatHistory = [
        { id: 1, query: "Shipment status #A1023", time: "2 hrs ago", type: "tracking" },
        { id: 2, query: "Revenue analysis this week", time: "5 hrs ago", type: "analytics" },
        { id: 3, query: "Driver performance report", time: "1 day ago", type: "report" },
        { id: 4, query: "Problematic deliveries", time: "2 days ago", type: "issue" },
    ];

    return (
        <aside className="fixed right-0 top-0 h-screen w-80 glass-card border-l border-teal-500/20 p-6 flex flex-col z-40 shadow-2xl hidden lg:flex overflow-y-auto scrollbar-hide">

            {/* User Profile Mini */}
            <div className="flex items-center justify-end gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="text-right">
                    <p className="text-white text-sm font-bold">Mitrax Admin</p>
                    <p className="text-gray-400 text-xs mt-0.5">Logistics Manager</p>
                </div>
                <div className="relative group">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30 relative overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                            MA
                        </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0F2A2A] shadow-lg"></span>
                </div>
            </div>

            {/* Section: History */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Clock size={18} className="text-teal-400" />
                        Chat History
                    </h3>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-lg">
                        {chatHistory.length}
                    </span>
                </div>
                <div className="space-y-3">
                    {chatHistory.map((item) => (
                        <div
                            key={item.id}
                            className="glass-card p-4 rounded-xl border border-teal-500/10 hover:border-teal-500/30 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex items-start gap-3">
                                <div className="bg-teal-500/20 p-2 rounded-lg text-teal-400 group-hover:bg-teal-500/30 transition-colors mt-0.5">
                                    <MessageSquare size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate group-hover:text-teal-300 transition-colors">
                                        {item.query}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                                        <Clock size={10} />
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section: Quick Stats */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <TrendingUp size={18} className="text-emerald-400" />
                        Quick Stats
                    </h3>
                </div>
                <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/20 rounded-lg">
                                    <Zap size={16} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">AI Response Time</p>
                                    <p className="text-gray-400 text-xs mt-0.5">Average</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-emerald-400 text-lg font-bold">1.2s</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-teal-500/20 rounded-lg">
                                    <MessageSquare size={16} className="text-teal-400" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">Total Queries</p>
                                    <p className="text-gray-400 text-xs mt-0.5">This month</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-purple-400 text-lg font-bold">247</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default ChatHistoryPanel;
