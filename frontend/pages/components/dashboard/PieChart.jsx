import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const PieChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Contas a Pagar',
            data: [300, 500, 400, 600, 700, 800, 900],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Contas a Receber',
            data: [200, 400, 300, 500, 600, 700, 800],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Contas a Pagar e Contas a Receber',
          },
        },
      };
    
      return (
        <Box p={5}>
          <Heading as="h1" mb={5}>Financeiro</Heading>
          <Bar data={data} options={options} />
        </Box>
      );
};

export default PieChart;
