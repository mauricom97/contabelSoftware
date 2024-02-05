import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateBillToPay from "./components/financial/CreateBillToPay";
import { DeleteIcon } from "@chakra-ui/icons";
import io from "socket.io-client";
import urlApi from "../utils/urlApi";
import InputMask from "react-input-mask";

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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import moment from "moment";

const status = {
    1: "Em aberto",
    2: "Parcialmente pago",
    3: "Pago",
};
const InputsEditInstallment = (item) => {
    return (
        <Box p={5}>
            <FormControl id="supplier">
                <FormLabel>Fornecedor</FormLabel>
                <Input
                    placeholder="Fornecedor"
                    size="md"
                    mb="2"
                    defaultValue={item.Supplier.Entity.sampleName}
                />
            </FormControl>

            <FormControl id="description">
                <FormLabel>Descrição</FormLabel>
                <Input
                    placeholder="Descrição"
                    size="md"
                    mb="2"
                    defaultValue={item.description}
                />
            </FormControl>

            <FormControl id="value">
                <FormLabel>Valor</FormLabel>
                <InputMask
                    mask="9999999999.99"
                    maskChar={null}
                    defaultValue={item.value}
                >
                    {() => (
                        <Input
                            placeholder="Valor"
                            size="md"
                            mb="2"
                            defaultValue={item.value}
                        />
                    )}
                </InputMask>
            </FormControl>

            <FormControl id="dueDate">
                <FormLabel>Data de vencimento</FormLabel>

                <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    defaultValue={moment(item.dueDate).format("DD/MM/YYYY")}
                >
                    {() => (
                        <Input
                            placeholder="Data de vencimento"
                            size="md"
                            mb="2"
                        />
                    )}
                </InputMask>
            </FormControl>

            <FormControl id="status">
                <FormLabel>Status</FormLabel>
                <Input
                    placeholder="Status"
                    size="md"
                    mb="2"
                    defaultValue={status[item.status]}
                />
            </FormControl>
            <Button colorScheme="blue" mr={3}>
                Salvar
            </Button>
            <Button colorScheme="red">Cancelar</Button>
        </Box>
    );
};

const DataTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billData, setBillData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

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

    const formatarData = (dueDate) => {
        // Converte a string de data para um objeto Date
        dueDate = moment(dueDate.slice(0, 10), "YYYY-MM-DD").format(
            "DD/MM/YYYY",
        );
        return dueDate;
    };

    const deleteBill = async (id) => {
        try {
            let config = {
                method: "delete",
                maxBodyLength: Infinity,
                url: `${urlApi}/billstopay`,
                headers: {
                    token: token,
                },
                params: { id: id },
            };

            const response = await axios
                .request(config)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });

            fetchBillData();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchBillData = async () => {
        try {
            let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${urlApi}/billstopay/filters?companyId=${window.localStorage.getItem(
                    "company",
                )}`,
                headers: {
                    token: token,
                },
                params: { company: localStorage.getItem("company") },
            };

            const response = await axios
                .request(config)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });

            setBillData(response.data);
            // Atualize os totais sempre que os dados da conta mudarem
            let total = 0;
            response.data.forEach((item) => {
                total += parseFloat(item.value);
            });
            setTotalAmount(total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchBillData();
        const socket = io(urlApi);

        socket.on("newAccountPayable", (data) => {
            console.log(data);
            fetchBillData();
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <Box
            maxH="100vh"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
        >
            {/* <Sidebar /> */}
            <Box flex="1" p={{ base: "10px", md: "40px" }} height="100vh">
                <Box>
                    <Flex justifyContent="flex-end">
                        <Button mb="4" onClick={handleOpenModal}>
                            Lançar conta(s)
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

                <Box
                    maxH={"80%"}
                    overflow="auto"
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    <Table size="sm" boxShadow="xs" rounded="md" bg="white">
                        <Thead
                            style={{
                                position: "sticky",
                                top: "0",
                                background: "white",
                                zIndex: "2",
                            }}
                        >
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
                                <Tr key={item.id} _hover={{ bg: "gray.100" }}>
                                    <Td>{item.description}</Td>
                                    <Td>
                                        {item.value.toLocaleString("pt-br", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </Td>
                                    <Td>{item.Supplier.Entity.sampleName}</Td>
                                    <Td>{formatarData(item.dueDate)}</Td>
                                    <Td>
                                        {(() => {
                                            if (item.status === 1)
                                                return <Badge>Em aberto</Badge>;
                                            else if (item.status === 2)
                                                return (
                                                    <Badge
                                                        variant="outline"
                                                        colorScheme="green"
                                                    >
                                                        Parcialmente pago
                                                    </Badge>
                                                );
                                            else if (item.status === 3)
                                                return (
                                                    <Badge colorScheme="green">
                                                        Pago
                                                    </Badge>
                                                );
                                            else return "Status desconhecido";
                                        })()}
                                    </Td>
                                    <Td>
                                        <Center>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        size="sm"
                                                        icon={<EditIcon />} // Adiciona o ícone de edição
                                                        aria-label="Editar"
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    {/* Conteúdo do Popover para edição */}
                                                    {InputsEditInstallment(
                                                        item,
                                                    )}
                                                </PopoverContent>
                                            </Popover>
                                            <IconButton
                                                ml="10px"
                                                size="sm"
                                                colorScheme="red"
                                                aria-label="Excluir"
                                                icon={<DeleteIcon />}
                                                onClick={() =>
                                                    deleteBill(item.id)
                                                }
                                            />
                                        </Center>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
                <Flex justifyContent="flex-end" mt={2}>
                    <Box
                        w="30vh"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={2}
                        >
                            <Box
                                fontWeight="bold"
                                color={
                                    totalAmount < 0 ? "green.500" : "red.500"
                                }
                            >
                                Total:
                            </Box>
                            <Box
                                fontWeight="bold"
                                color={
                                    totalAmount < 0 ? "green.500" : "red.500"
                                }
                            >
                                {totalAmount.toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            </Box>

            <CreateBillToPay
                isOpen={isModalOpen}
                onOpen={handleOpenModal}
                onClose={handleCloseModal}
            />
        </Box>
    );
};

export default DataTable;
