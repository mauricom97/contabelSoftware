import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import CreateBillToPay from "./components/financial/CreateBillToPay";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Flex,
    Center,
    Button,
    Input,
    Badge,
    IconButton,
} from "@chakra-ui/react";

import moment from "moment";

const DataTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billData, setBillData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // const [companiesList, setCompaniesList] = useState([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    let token;
    if (typeof window !== "undefined") {
        token = window.localStorage.getItem("token");
    }
    const fetchBillData = async (filters) => {
        try {
            const response = await axios.get(
                `http://localhost:4356/billstopay?${filters}`,
                {
                    headers: {
                        token: token,
                    },
                },
            );
            setBillData(response.data);

            // Atualize os totais sempre que os dados da conta mudarem
            let total = 0;
            response.data.forEach((item) => {
                total += parseFloat(item.amount);
            });
            setTotalAmount(total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchBillData(`status=1`);
    }, []);
    return (
        <Box>
            <Sidebar />
            <Center>
                <Box position="absolute" top="10%" w="60%" minH="50%">
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
                                <Th>Fornecedor</Th>
                                <Th>Data de Vencimento</Th>
                                <Th>Status</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {billData.map((item) => (
                                <Tr key={item.id}>
                                    <Td>{item.description}</Td>
                                    <Td>R$: {item.amount}</Td>
                                    <Td>{item.companyId}</Td>
                                    <Td>
                                        {(() => {
                                            if (
                                                moment().format("DD/MM/YYYY") >
                                                moment(item.dueDate).format(
                                                    "DD/MM/YYYY",
                                                )
                                            )
                                                return (
                                                    <Badge colorScheme="red">
                                                        {moment(
                                                            item.dueDate,
                                                        ).format("DD/MM/YYYY")}
                                                    </Badge>
                                                );
                                            else
                                                return moment(
                                                    item.dueDate,
                                                ).format("DD/MM/YYYY");
                                        })()}
                                    </Td>
                                    <Td>
                                        {(() => {
                                            if (item.status === "1")
                                                return <Badge>Em aberto</Badge>;
                                            else if (item.status === "2")
                                                return (
                                                    <Badge
                                                        variant="outline"
                                                        colorScheme="green"
                                                    >
                                                        Parcialmente pago
                                                    </Badge>
                                                );
                                            else if (item.status === "3")
                                                return (
                                                    <Badge colorScheme="green">
                                                        Pago
                                                    </Badge>
                                                );
                                            else return "Status desconhecido";
                                        })()}
                                    </Td>
                                    <Td>
                                        <IconButton
                                            size="sm"
                                            colorScheme="blue"
                                            mr="2"
                                            aria-label="Editar"
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            size="sm"
                                            colorScheme="red"
                                            mr="2"
                                            aria-label="Excluir"
                                            icon={<DeleteIcon />}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <div>
                        <strong>Total:</strong> R$: {totalAmount}
                    </div>
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
