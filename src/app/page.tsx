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
      case 'revenue': return <DollarSign size={24} />;
      case 'shipment': return <Package size={24} />;
      case 'status': return <Truck size={24} />;
      case 'operational': return <Wallet size={24} />;
      default: return <Package size={24} />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'revenue': return '#10B981';    // Emerald Green
      case 'shipment': return '#8B5CF6';   // Purple
      case 'status': return '#EF4444';     // Red
      case 'operational': return '#F59E0B'; // Amber
      default: return '#8B5CF6';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0F0F1E] font-sans overflow-hidden selection:bg-purple-500/30 relative">
      {/* Ambient background gradients */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-24 mr-0 lg:mr-80 p-8 h-screen overflow-y-auto relative z-10 scrollbar-hide">

        {/* Header Section */}
        <header className="flex justify-between items-start mb-8 mt-2">
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Dashboard</h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">Your Personal Logistics Center</p>
          </div>

          <div className="glass-card px-5 py-3 rounded-2xl flex items-center gap-3 w-80 focus-within:ring-2 focus-within:ring-purple-500/50 transition-all shadow-lg">
            <span className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <input
              type="text"
              placeholder="Search shipments..."
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-500 font-medium"
            />
          </div>
        </header>

        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading ? (
            // Skeleton Loader
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-[#1A1A2E] rounded-3xl p-6 h-[200px] border border-[#2A2A3E] animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
              </div>
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
          <ShipmentChart />
        </div>

      </main>

      {/* Right Sidebar (Fixed) */}
      <ChatHistoryPanel />

    </div>
  );
}
