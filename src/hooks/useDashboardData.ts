"use client";

import { useState, useEffect } from 'react';
import { fetchDashboardData, DashboardMetric } from '@/services/dataService';

export const useDashboardData = () => {
    const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDashboardData();
                setMetrics(data);
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { metrics, loading, error };
};
