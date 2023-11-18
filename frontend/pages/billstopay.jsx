import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CreateBillToPay from "./components/financial/CreateBillToPay";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    Box,
    Flex,
    Center,
    Button,
    Input,
    Grid,
    GridItem,
    Icon,
} from "@chakra-ui/react";

import moment from "moment";

const DataTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [companiesList, setCompaniesList] = useState([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const data = [
        {
            id: 1,
            description: "Conta de luz",
            company: {
                id: 1,
                name: "Empresa 1",
            },
            amount: 100,
            dueDate: "2021-09-20",
            status: "PENDING",
            companyId: 1,
            createdAt: "2021-09-20T12:00:00",
        },
        {
            id: 2,
            description: "Conta de água",
            company: {
                id: 2,
                name: "Empresa 2",
            },
            amount: 200,
            dueDate: "2021-09-20",
            status: "PENDING",
            companyId: 1,
            createdAt: "2021-09-20T12:00:00",
        },
        {
            id: 3,
            description: "Conta de telefone",
            company: {
                id: 3,
                name: "Empresa 3",
            },
            amount: 300,
            dueDate: "2021-09-20",
            status: "PENDING",
            companyId: 1,
            createdAt: "2021-09-20T12:00:00",
        },
    ];
    return (
        <Box>
            <Sidebar />
            <Center>
                <Box position="absolute" top="10%" w="60%">
                    <Box>
                        <Flex justifyContent="flex-end">
                            <Button mb="4" onClick={handleOpenModal}>
                                Criar conta
                            </Button>
                            <Button mb="4" ml="5">
                                Filtros
                            </Button>
                            <Input
                                w="15"
                                ml="4"
                                placeholder="Pesquisar"
                                size="md"
                            />
                        </Flex>
                    </Box>
                    <Table size="sm" boxShadow="xs" rounded="md" bg="white">
                        <Thead>
                            <Tr>
                                <Th>Descrição</Th>
                                <Th>Valor</Th>
                                <Th>Empresa</Th>
                                <Th>Data de Vencimento</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.description}</Td>
                                    <Td>R$: {item.amount}</Td>
                                    <Td>{item.company.name}</Td>
                                    <Td>
                                        {moment(
                                            item.dueDate,
                                            "YYYY-MM-DD",
                                        ).format("DD/MM/YYYY")}
                                    </Td>
                                    <Td>{item.status}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Center>
            <CreateBillToPay
                isOpen={isModalOpen}
                onOpen={handleOpenModal}
                onClose={handleCloseModal}
            />
        </Box>
    );
};

export default DataTable;
