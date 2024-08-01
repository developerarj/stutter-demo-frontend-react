import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56],
      borderColor: '#ffff',
      backgroundColor: '#ffff',
      fill: true,
      tension: 0.5, // For wavy lines
      pointBackgroundColor: '#1EE66E', // Green points
      pointBorderWidth: 1, // Border width for points
      pointRadius: 5, // Radius of the points
    },
    {
      label: 'Dataset 2',
      data: [28, 48, 40, 19, 86],
      borderColor: '#ffff',
      backgroundColor: '#ffff',
      fill: true,
      tension: 0.5, // For wavy lines
      pointBackgroundColor: '#1EE66E',
      pointBorderWidth: 1, // Border width for points
      pointRadius: 5, // Radius of the points
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
    title: {
      display: true,
      text: 'Monthly Improvement',
      color: '#fff',
    },
  },
  scales: {
    x: {
      grid: {
        color: '#ccc',
      },
      ticks: {
        color: '#fff',
      },
    },
    y: {
      grid: {
        color: '#ccc',
      },
      ticks: {
        color: '#fff',
      },
    },
  },
};

const CustomLineChart = () => (
  <Box width="100%" height="100%" p={4}>
    <Box>
      <Line data={data} options={options} height="300px" width="275px" />
    </Box>
  </Box>
);

export default CustomLineChart;
