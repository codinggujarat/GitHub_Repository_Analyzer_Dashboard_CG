import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function ContributorsChart({ contributors }) {
    const chartData = {
        labels: contributors.map(c => c.login),
        datasets: [{
            label: 'Contributions',
            data: contributors.map(c => c.contributions),
            backgroundColor: '#a78bfa',
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 👈 allows auto height
    };

    return (
        <div className="chart-card">
            <div class="dashboard-card">

                <i class='bx bx-group icon'></i>
                <span class="label">Top Contributors</span>
            </div>
            <div className="chart-wrapper" style={{ height: '300px' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}
