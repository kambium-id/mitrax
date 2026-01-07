import React from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    PieChart,
    Settings,
    History,
    LogOut,
    TrendingUp,
    Package
} from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-24 bg-gradient-to-b from-[#7C3AED] to-[#5B21B6] flex flex-col items-center py-8 z-50 shadow-2xl shadow-purple-900/50">
            {/* Logo */}
            <div className="mb-10 relative group">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 border border-white/30 group-hover:scale-110 transition-transform duration-300 animate-float">
                    <div className="text-white font-bold text-xl tracking-tight">M</div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/80 font-semibold whitespace-nowrap">MITRAX</div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 w-full px-4 space-y-3 flex flex-col items-center">
                <div className="nav-item active group" title="Dashboard">
                    <LayoutDashboard size={24} className="text-white" />
                    <span className="text-[9px] uppercase font-semibold tracking-wider">Dashboard</span>
                </div>

                <div className="nav-item group" title="Transfers">
                    <Package size={24} />
                    <span className="text-[9px] uppercase font-semibold tracking-wider">Transfers</span>
                </div>

                <div className="nav-item group" title="Analytics">
                    <PieChart size={24} />
                    <span className="text-[9px] uppercase font-semibold tracking-wider">Analytics</span>
                </div>

                <div className="nav-item group" title="Trends">
                    <TrendingUp size={24} />
                    <span className="text-[9px] uppercase font-semibold tracking-wider">Trends</span>
                </div>

                <div className="nav-item group" title="History">
                    <History size={24} />
                    <span className="text-[9px] uppercase font-semibold tracking-wider">History</span>
                </div>
            </nav>

            {/* Divider */}
            <div className="w-12 h-[1px] bg-white/20 mb-4"></div>

            {/* Bottom Actions */}
            <div className="w-full px-4 space-y-3">
                <div className="nav-item group opacity-90 hover:opacity-100" title="Settings">
                    <Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="nav-item group opacity-90 hover:opacity-100 hover:bg-red-500/20" title="Logout">
                    <LogOut size={22} className="group-hover:text-red-300" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
