import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomBarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white', 
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (tooltipItem) => {
            return `Value: ${tooltipItem.raw}`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        titleColor: 'white', 
        bodyColor: 'white', 
        borderColor: 'white', 
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        ticks: {
          color: 'white', 
        },
        title: {
          display: true,
          text: 'Months',
          color: 'white', 
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
          borderColor: 'rgba(255, 255, 255, 0.5)', 
        },
        ticks: {
          color: 'white', 
        },
        title: {
          display: true,
          text: 'Values',
          color: 'white', 
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    }
  };

  const realData1 = [100, 200, 300, 400, 500];
  const realData2 = [150, 250, 350, 450, 550];
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: realData1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: realData2,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Box width="100%" height="100%" p={4}> 
        <Bar options={options} data={data} />       
    </Box>
  );
};

export default CustomBarChart;
