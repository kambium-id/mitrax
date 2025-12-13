import React from 'react';
import { MessageSquare, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ChatHistoryPanel = () => {
    return (
        <aside className="hidden lg:flex flex-col w-80 h-screen bg-[#121212] border-l border-[#1F1F1F] p-6 fixed right-0 top-0 z-40 overflow-y-auto">

            {/* User Profile Mini */}
            <div className="flex items-center justify-end gap-4 mb-10">
                <div className="text-right">
                    <p className="text-white text-sm font-bold">Alex Morgan</p>
                    <p className="text-gray-500 text-xs">Admin</p>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden border-2 border-[#1F1F1F]">
                    {/* Placeholder Avatar */}
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                </div>
            </div>

            {/* Section: History */}
            <div className="mb-8">
                <h3 className="text-white font-bold text-lg mb-6">History</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#1F1F1F] p-3 rounded-2xl text-gray-400 group-hover:text-white transition-colors">
                                    <MessageSquare size={18} />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">Order #{1000 + i}</p>
                                    <p className="text-gray-500 text-xs">Jul 4, 2024</p>
                                </div>
                            </div>
                            <span className="text-red-400 text-sm font-medium hover:text-red-300">-</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section: Upcoming / Notifications */}
            <div>
                <h3 className="text-white font-bold text-lg mb-6">Updates</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#1F1F1F] p-3 rounded-2xl text-emerald-400">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">System Update</p>
                                <p className="text-gray-500 text-xs">Completed</p>
                            </div>
                        </div>
                        <span className="text-emerald-400 text-sm font-medium">+</span>
                    </div>
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#1F1F1F] p-3 rounded-2xl text-amber-400">
                                <AlertCircle size={18} />
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">High Traffic</p>
                                <p className="text-gray-500 text-xs">Warning</p>
                            </div>
                        </div>
                        <span className="text-amber-400 text-sm font-medium">!</span>
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default ChatHistoryPanel;
