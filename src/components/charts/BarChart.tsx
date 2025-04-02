import React from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    return (
        <div>
            <Bar data={data} />
        </div>
    );
};

export default BarChart;