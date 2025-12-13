import React from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    PieChart,
    Settings,
    History,
    LogOut,
    Wallet
} from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-24 bg-[#121212] border-r border-[#1F1F1F] flex flex-col items-center py-8 z-50">
            {/* Logo Placeholder */}
            <div className="mb-10 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 w-full px-4 space-y-6 flex flex-col items-center">
                <div className="nav-item active group">
                    <LayoutDashboard size={22} className="text-white" />
                </div>

                <div className="nav-item group">
                    <MessageSquare size={22} />
                </div>

                <div className="nav-item group">
                    <PieChart size={22} />
                </div>

                <div className="nav-item group">
                    <Wallet size={22} />
                </div>

                <div className="nav-item group">
                    <History size={22} />
                </div>
            </nav>

            {/* Bottom Actions */}
            <div className="w-full px-4 space-y-4">
                <div className="nav-item group opacity-60 hover:opacity-100">
                    <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="nav-item group opacity-60 hover:opacity-100 hover:text-red-400">
                    <LogOut size={24} />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
