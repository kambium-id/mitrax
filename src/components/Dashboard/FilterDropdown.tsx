"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Filter } from 'lucide-react';

export type PeriodType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL';

export interface FilterState {
  type: PeriodType;
  value: string; // ISO date string or specific format
}

interface FilterDropdownProps {
  onFilterChange: (filter: FilterState) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const [periodType, setPeriodType] = useState<PeriodType>('ALL');
  const [dateValue, setDateValue] = useState<string>(new Date().toISOString().split('T')[0]);

  // Handle type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as PeriodType;
    setPeriodType(newType);
    
    // Reset date value based on type if needed, or keep current date
    const today = new Date().toISOString().split('T')[0];
    if (newType === 'MONTHLY') {
      setDateValue(today.slice(0, 7)); // YYYY-MM
    } else if (newType === 'WEEKLY') {
      // For week, we need YYYY-Www format or just date
      // Native input type="week" gives "2024-W01"
      setDateValue(`${today.slice(0, 4)}-W01`); // Placeholder, ideally calculate current week
    } else {
      setDateValue(today);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };

  // Notify parent of changes
  useEffect(() => {
    onFilterChange({ type: periodType, value: dateValue });
  }, [periodType, dateValue, onFilterChange]);

  return (
    <div className="flex items-center gap-3 bg-[#0F2A2A] border border-[#1A3A3A] rounded-2xl p-2 px-4 shadow-lg">
      <div className="flex items-center gap-2 text-teal-400">
        <Filter size={18} />
        <span className="text-sm font-medium hidden md:inline">Filter:</span>
      </div>

      {/* Period Selector */}
      <div className="relative">
        <select
          value={periodType}
          onChange={handleTypeChange}
          className="appearance-none bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-teal-500 cursor-pointer pr-8"
        >
          <option value="DAILY" className="bg-[#0F2A2A]">Daily</option>
          <option value="WEEKLY" className="bg-[#0F2A2A]">Weekly</option>
          <option value="MONTHLY" className="bg-[#0F2A2A]">Monthly</option>
          <option value="ALL" className="bg-[#0F2A2A]">All Time</option>
        </select>
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {/* Date Input */}
      {periodType !== 'ALL' && (
        <div className="relative">
          <input
            type={periodType === 'MONTHLY' ? 'month' : periodType === 'WEEKLY' ? 'week' : 'date'}
            value={dateValue}
            onChange={handleDateChange}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-teal-500 cursor-pointer w-full md:w-auto [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
