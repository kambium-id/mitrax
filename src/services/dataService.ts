// Simulating a Google Sheet row structure
export interface DashboardMetric {
    id: string;
    label: string;
    value: string | number;
    trend: string;
    trendUp: boolean;
    category: 'shipment' | 'revenue' | 'operational' | 'status';
}

// Mock Data - Logistics Operations Metrics
const mockGoogleSheetData: DashboardMetric[] = [
    {
        id: '1',
        label: 'Total Pengiriman',
        value: '2,847',
        trend: '+12.5%',
        trendUp: true,
        category: 'shipment'
    },
    {
        id: '2',
        label: 'Pengiriman Hari Ini',
        value: '156',
        trend: '+8.3%',
        trendUp: true,
        category: 'shipment'
    },
    {
        id: '3',
        label: 'Pengiriman Bermasalah',
        value: '12',
        trend: '-15.2%',
        trendUp: true,  // Negative trend is good for problems
        category: 'status'
    },
    {
        id: '4',
        label: 'Pendapatan Hari Ini',
        value: 'Rp 45.2M',
        trend: '+18.7%',
        trendUp: true,
        category: 'revenue'
    },
    {
        id: '5',
        label: 'Armada Aktif',
        value: '89',
        trend: '+5.6%',
        trendUp: true,
        category: 'operational'
    },
    {
        id: '6',
        label: 'Rata-rata Waktu Kirim',
        value: '2.3 Hari',
        trend: '-8.1%',
        trendUp: true,  // Lower delivery time is better
        category: 'operational'
    },
];

export const fetchDashboardData = async (): Promise<DashboardMetric[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockGoogleSheetData);
        }, 800);
    });
};
