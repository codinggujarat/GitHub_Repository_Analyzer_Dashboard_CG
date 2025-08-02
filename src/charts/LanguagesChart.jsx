import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguagesChart({ languages }) {
    const chartData = {
        labels: Object.keys(languages),
        datasets: [{
            data: Object.values(languages),
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4CAF50',
                '#9370DB', '#FF69B4', '#00BFFF', '#FFA07A',
                '#FF4500', '#1E90FF', '#DAA520', '#20B2AA',
                '#BA55D3', '#FF1493'
            ],
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    font: {
                        size: 14 // 👈 Increase font size here
                    },
                    color: '#f8fafc' // Optional: light text color for dark theme
                }
            },
            tooltip: {
                bodyFont: {
                    size: 14
                },
                titleFont: {
                    size: 16
                }
            }
        }
    };

    return (
        <div className="chart-card">
            <div class="dashboard-card">

                <i class='bx bx-code-alt icon'></i>
                <span class="label">Language Breakdown</span>
            </div>

            <div className="chart-wrapper">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}
