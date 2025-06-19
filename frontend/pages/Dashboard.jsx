import { Box, Heading, SimpleGrid, Center } from "@chakra-ui/react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const barData = {
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

  const barOptions = {
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

  const pieData = {
    labels: ['Aluguel', 'Alimentação', 'Transporte', 'Lazer', 'Educação'],
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: [1000, 800, 600, 400, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gastos por Categoria',
      },
    },
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={5} color={"#8046A2"} textAlign="center">CONTROLE FINANCEIRO</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} justifyItems="center">
        <Center>
          <Box maxWidth="500px" width="500px" height="400px">
            <Bar data={barData} options={barOptions} />
          </Box>
        </Center>
        <Center>
          <Box maxWidth="500px" width="500px" height="400px">
            <Pie data={pieData} options={pieOptions} />
          </Box>
        </Center>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
