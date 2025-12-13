// Simulating a Google Sheet row structure
export interface DashboardMetric {
    id: string;
    label: string;
    value: string | number;
    trend: string;
    trendUp: boolean;
    category: 'performance' | 'volume' | 'finance' | 'status';
}

// Mock Data representing what we would get from a simple Google Sheet API or n8n webhook
const mockGoogleSheetData: DashboardMetric[] = [
    { id: '1', label: 'Total Volume', value: '$187,001', trend: '+15.3%', trendUp: true, category: 'finance' },
    { id: '2', label: 'Active Trucks', value: '21,345', trend: '-2.1%', trendUp: false, category: 'volume' },
    { id: '3', label: 'Fuel Cost', value: '$7,321', trend: '+4.5%', trendUp: false, category: 'finance' }, /* Trend up is bad for cost, but purely visual here */
    { id: '4', label: 'Est. Revenue', value: '$81,987', trend: '+12%', trendUp: true, category: 'finance' },
];

export const fetchDashboardData = async (): Promise<DashboardMetric[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGoogleSheetData);
        }, 1200);
    });
};
