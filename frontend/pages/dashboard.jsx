import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data01 = [
    { name: "Contas a Pagar", value: 400 },
    { name: "Contas a Receber", value: 600 },
];

const COLORS = ["#0088FE", "#00C49F"];

const Dashboard = () => {
    return (
        <Box p="5">
            <Text fontSize="xl" mb="5">
                Dashboard de Contas
            </Text>
            <Flex justify="center">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data01}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data01.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </Flex>
        </Box>
    );
};

export default Dashboard;
