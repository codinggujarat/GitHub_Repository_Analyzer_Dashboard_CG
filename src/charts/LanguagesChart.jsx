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
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 text-center">
                Language Breakdown
            </h3>
            <div className="chart-wrapper">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}
