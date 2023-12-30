import React from "react";
import {
    Box,
    Text,
    Flex,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Center,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Sidebar from "../pages/components/Sidebar";

const data01 = [
    { name: "Contas a Pagar", value: 400 },
    { name: "Contas a Receber", value: 600 },
];

const COLORS = ["#0088FE", "#00C49F"];

const Dashboard = () => {
    return (
        <Box>
            <Sidebar />
            <Box p="5" position="absolute" left="20%" top="1%" w="70%">
                <Text fontSize="xl" mb="5">
                    Dashboard de Contas
                </Text>

                <StatGroup>
                    <Stat>
                        <StatLabel>Sent</StatLabel>
                        <StatNumber>345,670</StatNumber>
                        <StatHelpText>
                            <StatArrow type="increase" />
                            23.36%
                        </StatHelpText>
                    </Stat>

                    <Stat>
                        <StatLabel>Clicked</StatLabel>
                        <StatNumber>45</StatNumber>
                        <StatHelpText>
                            <StatArrow type="decrease" />
                            9.05%
                        </StatHelpText>
                    </Stat>
                </StatGroup>
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
        </Box>
    );
};

export default Dashboard;
