"use client";

import React from 'react';
import { ChartData } from '@/services/dataService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                color: '#A78BFA',
                font: {
                    size: 12,
                    weight: 600 as const,
                },
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
        title: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(26, 26, 46, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#A78BFA',
            borderColor: '#8B5CF6',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            boxPadding: 6,
        }
    },
    scales: {
        y: {
            grid: {
                color: '#1A3A3A',
                drawBorder: false,
            },
            ticks: {
                color: '#6B7280',
                font: {
                    size: 11,
                }
            }
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#6B7280',
                font: {
                    size: 11,
                }
            }
        }
    },
    interaction: {
        intersect: false,
        mode: 'index' as const,
    },
};

interface ShipmentChartProps {
    data?: ChartData | null;
    loading?: boolean;
}

const ShipmentChart: React.FC<ShipmentChartProps> = ({ data, loading }) => {
    const chartData = {
        labels: data?.labels || [],
        datasets: [
            {
                fill: true,
                label: 'Jumlah Pengiriman',
                data: data?.datasets.shipments || [],
                borderColor: '#14B8A6',
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(20, 184, 166, 0.2)');
                    gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
                    return gradient;
                },
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#14B8A6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
            },
            {
                fill: true,
                label: 'Pendapatan (Juta Rp)',
                data: data?.datasets.revenue || [],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#10B981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
            },
            {
                fill: true,
                label: 'Pengiriman Bermasalah',
                data: data?.datasets.abnormal || [],
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointBackgroundColor: '#F59E0B',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
            },
        ],
    };

    return (
        <div className="dashboard-card relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-white text-lg font-bold mb-1">Fluktuasi Harian</h3>
                    <p className="text-gray-400 text-xs font-medium">Tren Data Terkini</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <span>Pengiriman</span>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span>Pendapatan</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span>Bermasalah</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-80">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    </div>
                ) : (
                    <Line options={options} data={chartData} />
                )}
            </div>
        </div>
    );
};

export default ShipmentChart;
