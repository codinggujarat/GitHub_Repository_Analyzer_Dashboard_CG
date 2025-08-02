import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function CommitsChart({ data }) {
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [{
            label: 'Commits',
            data: data.map(d => d.count),
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 👈 allows auto height
    };

    return (
        <div className="chart-card">
            <div class="dashboard-card">
                <i class='bx bx-git-commit icon'></i>
                <span class="label">Commits Over Time</span>
            </div>
            <div className="chart-wrapper" style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
