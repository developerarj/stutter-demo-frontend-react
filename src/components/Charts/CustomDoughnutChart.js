import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CustomDoughnutChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white', 
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        titleColor: 'white', 
        bodyColor: 'white',
        borderColor: 'white', 
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart',
        color: 'white',
      },
    },
   
  };

  const realData1 = [100, 200, 300, 400, 500];
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
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
      },
    ],
  };

  return (
    <Box width="100%" height="100%" p={4}>
      {/* <Heading as="h2" size="lg" mb={4} color="white"> 
        Doughnut Chart
      </Heading> */}
      
      <Doughnut options={options} data={data} />
     
    </Box>
  );
};

export default CustomDoughnutChart;
