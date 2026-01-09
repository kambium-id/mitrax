import React from 'react';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
    label: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    icon?: React.ReactNode;
    color?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    label,
    value,
    trend,
    trendUp = true,
    icon,
    color = "#14B8A6"  // Teal default
}) => {
    return (
        <div className="dashboard-card relative overflow-hidden group">
            {/* Decorative gradient line at top */}
            <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `linear-gradient(90deg, ${color}, transparent)`
                }}
            />

            {/* Ambient glow effect */}
            <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: color }}
            />

            {/* Header: Icon & Menu */}
            <div className="flex justify-between items-start mb-6">
                <div
                    className="p-4 rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 10px 30px -10px ${color}40`
                    }}
                >
                    <div className="relative z-10">
                        {icon}
                    </div>
                    {/* Icon shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                <button className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold text-white tracking-tight">{value}</div>
                <div className="text-gray-400 text-sm font-medium">{label}</div>

                {/* Trend Indicator */}
                {trend && (
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trendUp
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-red-500/10 text-red-400'
                            }`}>
                            {trendUp ? (
                                <TrendingUp size={12} />
                            ) : (
                                <TrendingDown size={12} />
                            )}
                            <span>{trend}</span>
                        </div>
                        <span className="text-xs text-gray-500">vs last period</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryCard;
