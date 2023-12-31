import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import urlApi from "../../../utils/urlApi";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select as ChakraSelect,
    Box,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const CreateBillToPay = ({ isOpen, onOpen, onClose }) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [queryFindSuppliers, setQueryFindSuppliers] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedTypeExpense, setSelectedTypeExpense] = useState(null);
    const [typesExpenses, setTypesExpenses] = useState([]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (queryFindSuppliers) {
                performSearch();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [queryFindSuppliers]);

    const performSearch = async () => {
        try {
            await axios
                .get(`${urlApi}/entity/filters`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                    params: {
                        search: queryFindSuppliers,
                        type: "supplier",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setSuppliers(
                        response.data.map((s) => ({
                            value: s.id,
                            label: s.sampleName,
                        })),
                    );
                });
        } catch (error) {
            console.error("Erro na busca:", error);
        }
    };

    const toast = useToast();
    const registerBill = () => {
        const expenseData = {
            description: description,
            amount: parseFloat(amount),
            dueDate: dueDate,
            status: status,
            companyId: 2,
        };

        let token;
        if (typeof window !== "undefined") {
            token = window.localStorage.getItem("token");
        }
        const config = {
            method: "post",
            url: `${urlApi}/billstopay`,
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
            data: expenseData,
        };

        axios
            .request(config)
            .then((response) => {
                toast({
                    title: "Conta criada com sucesso.",
                    description: "Sua nova despesa foi criada com sucesso.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });

                onClose();
            })
            .catch((error) => {
                console.error("Erro ao cadastrar despesa:", error);
            });
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Informações da nova despesa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Fornecedor</FormLabel>
                            <Box
                                onChange={(e) =>
                                    setQueryFindSuppliers(e.target.value)
                                }
                            >
                                <Select
                                    placeholder="Busque pelo fornecedor"
                                    value={selectedSupplier}
                                    options={suppliers}
                                    onChange={setSelectedSupplier}
                                />
                            </Box>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Descrição</FormLabel>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descrição"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Data de validade inicial</FormLabel>
                            <Input
                                type="date"
                                placeholder="Data de validade"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Tipo de despesa</FormLabel>
                            <Select
                                placeholder="Tipo de despesa"
                                value={selectedTypeExpense}
                                options={typesExpenses}
                                onChange={setSelectedTypeExpense}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Valor</FormLabel>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="Valor"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <ChakraSelect
                                placeholder="Selecione o status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="1">Em aberto</option>
                                <option value="2">Parcialmente pago</option>
                                <option value="3">Pago</option>
                            </ChakraSelect>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={registerBill}
                            colorScheme="blue"
                            mr={3}
                            disabled={
                                !description || !dueDate || !amount || !status
                            }
                        >
                            Criar despesa
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateBillToPay;
