"use client";

import React from 'react';
import { Truck, Package, DollarSign, Wallet } from 'lucide-react';
import Sidebar from '@/components/Layout/Sidebar';
import ChatHistoryPanel from '@/components/Layout/ChatHistoryPanel';
import SummaryCard from '@/components/Dashboard/SummaryCard';
import ShipmentChart from '@/components/Dashboard/ShipmentChart';
import ChatInterface from '@/components/Chat/ChatInterface';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function Home() {
  const { metrics, loading } = useDashboardData();

  const getIcon = (category: string) => {
    switch (category) {
      case 'finance': return <DollarSign size={20} />;
      case 'volume': return <Package size={20} />;
      case 'status': return <Truck size={20} />;
      default: return <Wallet size={20} />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'finance': return '#10B981'; // Emerald
      case 'volume': return '#A855F7';  // Purple
      case 'status': return '#3B82F6';  // Blue
      default: return '#F59E0B';        // Amber
    }
  };

  return (
    <div className="flex min-h-screen bg-[#121212] font-sans overflow-hidden selection:bg-indigo-500/30">

      {/* Left Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-24 mr-0 lg:mr-80 p-8 h-screen overflow-y-auto relative z-10 scrollbar-hide">

        {/* Header Section */}
        <header className="flex justify-between items-start mb-10 mt-2">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">Your Personal Logistics Center</p>
          </div>

          <div className="bg-[#1F1F1F] px-4 py-3 rounded-2xl flex items-center gap-3 w-80 border border-[#2A2A2A] focus-within:border-indigo-500/50 transition-colors shadow-sm">
            <span className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600 font-medium"
            />
          </div>
        </header>

        {/* Dynamic Summary Cards - Forced Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // Skeleton Loader
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-[#1F1F1F] rounded-3xl p-6 h-[160px] animate-pulse"></div>
            ))
          ) : (
            metrics.map((metric) => (
              <SummaryCard
                key={metric.id}
                label={metric.label}
                value={metric.value}
                trend={metric.trend}
                trendUp={metric.trendUp}
                icon={getIcon(metric.category)}
                color={getColor(metric.category)}
              />
            ))
          )}
        </div>

        {/* Central Layout: Chat Interface as Hero */}
        <div className="w-full h-[calc(100vh-400px)] min-h-[500px] mb-8">
          <ChatInterface />
        </div>

        {/* Analytics Section (Below Chat) */}
        <div className="mb-10">
          <h3 className="text-white font-bold text-lg mb-4">Analytics Overview</h3>
          <div className="h-80 w-full">
            <ShipmentChart />
          </div>
        </div>

      </main>

      {/* Right Sidebar (Fixed) */}
      <ChatHistoryPanel />

    </div>
  );
}
