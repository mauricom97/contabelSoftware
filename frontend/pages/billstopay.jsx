import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import CreateBillToPay from "./components/financial/CreateBillToPay";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import io from "socket.io-client";
import urlApi from "../utils/urlApi";

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
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    FocusLock,
    Stack,
    ButtonGroup,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

import moment from "moment";
const DataTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billData, setBillData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const firstFieldRef = React.useRef(null);

    // import  FocusLock from "react-focus-lock"

    // 1. Create a text input component
    const TextInput = React.forwardRef((props, ref) => {
        return (
            <FormControl>
                <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
                <Input ref={ref} id={props.id} {...props} />
            </FormControl>
        );
    });

    // 2. Create the form
    const Form = ({ firstFieldRef, onCancel }) => {
        return (
            <Stack spacing={4}>
                <TextInput
                    label="First name"
                    id="first-name"
                    ref={firstFieldRef}
                    defaultValue="John"
                />
                <TextInput
                    label="Last name"
                    id="last-name"
                    defaultValue="Smith"
                />
                <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button isDisabled colorScheme="teal">
                        Save
                    </Button>
                </ButtonGroup>
            </Stack>
        );
    };

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
        console.log(id);
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
        // Limpar o socket quando o componente for desmontado
        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <Box>
            <Sidebar />
            <Center>
                <Box position="absolute" w="70%" top={30} left={300}>
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
                    <Box>
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
                                    <Tr
                                        key={item.id}
                                        bg={
                                            moment(item.dueDate).format(
                                                "DD/MM/YYYY",
                                            ) >=
                                                moment().format("DD/MM/YYYY") &&
                                            item.status === 1
                                                ? "#FFB6C1"
                                                : "#FFF"
                                        }
                                    >
                                        <Td>{item.description}</Td>
                                        <Td>
                                            {item.value.toLocaleString(
                                                "pt-br",
                                                {
                                                    style: "currency",
                                                    currency: "BRL",
                                                },
                                            )}
                                        </Td>
                                        <Td>
                                            {item.Supplier.Entity.sampleName}
                                        </Td>
                                        <Td>{formatarData(item.dueDate)}</Td>
                                        <Td>
                                            {(() => {
                                                if (item.status === 1)
                                                    return (
                                                        <Badge>Em aberto</Badge>
                                                    );
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
                                                else
                                                    return "Status desconhecido";
                                            })()}
                                        </Td>
                                        <Td>
                                            <Center>
                                                <Popover
                                                    isOpen={isOpen}
                                                    initialFocusRef={
                                                        firstFieldRef
                                                    }
                                                    onOpen={onOpen}
                                                    onClose={onClose}
                                                    placement="right"
                                                    closeOnBlur={false}
                                                >
                                                    <PopoverTrigger>
                                                        <IconButton
                                                            size="sm"
                                                            icon={<EditIcon />}
                                                            mr="2"
                                                        />
                                                    </PopoverTrigger>
                                                    <PopoverContent p={5}>
                                                        <FocusLock
                                                            returnFocus
                                                            persistentFocus={
                                                                false
                                                            }
                                                        >
                                                            <PopoverArrow />
                                                            <PopoverCloseButton />
                                                            <Form
                                                                firstFieldRef={
                                                                    firstFieldRef
                                                                }
                                                                onCancel={
                                                                    onClose
                                                                }
                                                            />
                                                        </FocusLock>
                                                    </PopoverContent>
                                                </Popover>
                                                <IconButton
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
                    <div>
                        <strong>Total:</strong>
                        {totalAmount.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                        })}
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
