import { getDashboardData, getChartData } from '@/app/actions/dashboard';
import { FilterState } from '@/components/Dashboard/FilterDropdown';

export interface ChartData {
    labels: string[];
    datasets: {
        shipments: number[];
        revenue: number[];
        abnormal: number[];
    };
}

export interface DashboardMetric {
    id: string;
    label: string;
    value: string | number;
    trend: string;
    trendUp: boolean;
    category: 'shipment' | 'revenue' | 'operational' | 'status';
}

export const fetchDashboardData = async (filter?: FilterState): Promise<DashboardMetric[]> => {
    // Call the server action with filter
    return await getDashboardData(filter);
};

export const fetchChartData = async (filter?: FilterState): Promise<ChartData> => {
    return await getChartData(filter);
};
