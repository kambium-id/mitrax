import React from 'react';
import { MoreVertical } from 'lucide-react';

interface SummaryCardProps {
    label: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon?: React.ReactNode;
    color?: string; // Icon color
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, trend, icon, color = "#fff" }) => {
    return (
        <div className="bg-[#1F1F1F] rounded-[2rem] p-6 h-full flex flex-col justify-between relative group hover:bg-[#252525] transition-colors duration-300 border border-transparent hover:border-[#2A2A2A]">

            {/* Header: Icon & Menu */}
            <div className="flex justify-between items-start mb-4">
                <div className="p-3.5 rounded-2xl bg-[#121212] flex items-center justify-center text-white shadow-inner" style={{ color: color }}>
                    {icon}
                </div>
                <button className="text-gray-600 hover:text-white transition-colors p-1 -mr-2">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-white tracking-normal">{value}</div>
                <div className="text-gray-400 text-sm font-medium">{label}</div>
                <div className="text-xs text-gray-500 mt-2 font-medium tracking-wide">Total Amount</div>
            </div>

        </div>
    );
};

export default SummaryCard;
