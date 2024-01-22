import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormControlStyles, useToast } from "@chakra-ui/react";
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
    Separator,
    Grid,
    GridItem,
    Center,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";
// import ChevronDownIcon from "@material-ui/icons/ChevronDown";

import { Select } from "chakra-react-select";
import moment from "moment";

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
    const [intervalBill, setIntervalBill] = useState("Intervalo");
    const [numberReleases, setNumberReleases] = useState(1);

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
                .get(`${urlApi}/suppliers/filter`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                    params: {
                        filter: queryFindSuppliers,
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
        let releases = [];

        let gap = null;
        switch (intervalBill) {
            case "Dias":
                gap = "day";
                break;
            case "Semanas":
                gap = "week";
                break;
            case "Meses":
                gap = "month";
                break;
            case "Anos":
                gap = "year";
                break;
            default:
                break;
        }

        console.log(numberReleases);

        for (let i = 0; i < numberReleases; i++) {
            let day = moment(dueDate).add(i, gap).format("YYYY-MM-DD");
            console.log(day);
            releases.push({
                description: description,
                value: parseFloat(amount),
                dueDate: day,
                status: parseInt(status),
                companyId: parseInt(window.localStorage.getItem("company")),
                idSupplier: parseInt(selectedSupplier.value),
            });
        }

        console.log(releases);

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
            data: releases,
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
                            <FormLabel>Tipo de despesa</FormLabel>
                            <Select
                                placeholder="Tipo de despesa"
                                value={selectedTypeExpense}
                                options={typesExpenses}
                                onChange={setSelectedTypeExpense}
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
                            <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                                <GridItem w="100%" h="10">
                                    <Input
                                        w="100%"
                                        type="number"
                                        step="0.01"
                                        placeholder="R$ 0.00"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                    />
                                </GridItem>
                                <GridItem w="100%" h="10">
                                    <Input
                                        htmlSize={4}
                                        placeholder="Qtde"
                                        width="auto"
                                        value={numberReleases}
                                        onChange={(e) =>
                                            setNumberReleases(e.target.value)
                                        }
                                    />
                                </GridItem>
                                <GridItem w="100%" h="10">
                                    <Center p="2">X</Center>
                                </GridItem>
                                <GridItem w="100%" h="10">
                                    <Menu>
                                        <MenuButton as={Button}>
                                            {intervalBill}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    setIntervalBill("Dias")
                                                }
                                            >
                                                Dias
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setIntervalBill("Semanas")
                                                }
                                            >
                                                Semanas
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setIntervalBill("Meses")
                                                }
                                            >
                                                Meses
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setIntervalBill("Anos")
                                                }
                                            >
                                                Anos
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </GridItem>
                            </Grid>
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
