"use client";

import React from 'react';
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
                color: '#94a3b8',
            },
        },
        title: {
            display: false,
        },
        tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: '#334155',
            borderWidth: 1,
        }
    },
    scales: {
        y: {
            grid: {
                color: '#334155',
                drawBorder: false,
            },
            ticks: {
                color: '#94a3b8',
            }
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#94a3b8',
            }
        }
    }
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Delivered',
            data: [65, 59, 80, 81, 56, 55, 90],
            borderColor: '#38bdf8', /* Sky 400 */
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            tension: 0.4,
        },
        {
            fill: true,
            label: 'In Transit',
            data: [28, 48, 40, 19, 46, 27, 40],
            borderColor: '#818cf8', /* Indigo 400 */
            backgroundColor: 'rgba(129, 140, 248, 0.2)',
            tension: 0.4,
        },
    ],
};

const ShipmentChart = () => {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-96">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-6">Weekly Shipment Trends</h3>
            <div className="h-80">
                <Line options={options} data={data} />
            </div>
        </div>
    );
};

export default ShipmentChart;
