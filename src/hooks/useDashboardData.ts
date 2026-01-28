"use client";

import { useState, useEffect } from 'react';
import { fetchDashboardData, fetchChartData, DashboardMetric, ChartData } from '@/services/dataService';
import { FilterState } from '@/components/Dashboard/FilterDropdown';

export const useDashboardData = (filter?: FilterState) => {
    const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch metrics and chart data in parallel
                const [metricsData, chartRes] = await Promise.all([
                    fetchDashboardData(filter),
                    fetchChartData(filter)
                ]);
                
                setMetrics(metricsData);
                setChartData(chartRes);
            } catch (err) {
                setError('Failed to load dashboard data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Debounce could be added here if needed, but for now direct call
        loadData();
    }, [filter]); // Re-run when filter changes

    return { metrics, chartData, loading, error };
};
