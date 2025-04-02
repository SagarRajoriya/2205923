import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
    data: {
        labels: string[];
        values: number[];
    };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
            },
        ],
    };

    return <Pie data={chartData} />;
};

export default PieChart;