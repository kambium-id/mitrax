import React from 'react';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

const activities = [
    { id: 1, type: 'delivered', message: 'Order #SH-1209 has been delivered.', time: '10 min ago' },
    { id: 2, type: 'transit', message: 'Order #SH-1210 is on the way to Jakarta.', time: '45 min ago' },
    { id: 3, type: 'delay', message: 'Order #SH-1205 is delayed due to weather.', time: '2 hours ago' },
    { id: 4, type: 'pickup', message: 'New shipment picked up from Warehouse A.', time: '3 hours ago' },
];

const RecentActivity = () => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'delivered': return <CheckCircle size={18} className="text-emerald-400" />;
            case 'transit': return <Truck size={18} className="text-sky-400" />;
            case 'delay': return <AlertCircle size={18} className="text-rose-400" />;
            case 'pickup': return <Package size={18} className="text-purple-400" />;
            default: return <Package size={18} className="text-slate-400" />;
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                        <div className="mt-1">
                            {getIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-200">{activity.message}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
