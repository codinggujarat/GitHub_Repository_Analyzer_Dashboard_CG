import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function StarsGrowthChart() {
    const mockData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Stars Growth (Mocked)',
            data: [100, 300, 800, 1500, 2300],
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#f8fafc',
                    font: { size: 14 }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#f8fafc', font: { size: 12 } },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: { color: '#f8fafc', font: { size: 12 } },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    };

    return (
        <div className="chart-card">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 text-center">Stars Growth (Mocked)</h3>
            <div className="chart-wrapper">
                <Line data={mockData} options={options} />
            </div>
        </div>
    );
}
