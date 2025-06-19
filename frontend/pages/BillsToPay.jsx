import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBillToPay from './components/financial/CreateBillToPay';
import { DeleteIcon } from '@chakra-ui/icons';
import io from 'socket.io-client';
import urlApi from '../utils/urlApi';
import InputMask from 'react-input-mask';
import ImportBillToPay from './components/financial/ImportBillToPay';
import ControlsBills from '../components/bills/controls';
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
    Select as ChakraSelect,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    FormControl,
    FormLabel,
    Checkbox,
    CheckboxGroup,
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';

import moment from 'moment';

const status = {
    1: 'Em aberto',
    2: 'Parcialmente pago',
    3: 'Pago',
};

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        // Faça algo com o arquivo aqui
        console.log(file.name);
    }
}

const InputsEditInstallment = ({ bill }) => {
    const [status, setStatus] = useState(bill.status.toString());
    const [description, setDescription] = useState(bill.description);
    const [value, setValue] = useState(bill.value);
    const [dueDate, setDueDate] = useState(
        moment(bill.dueDate).format('DD/MM/YYYY')
    );

    const editBill = () => {
        alert(
            `Descrição: ${description}, Valor: ${value}, Data de vencimento: ${dueDate}, Status: ${status}`
        );
        let token;
        if (typeof window !== 'undefined') {
            token = window.localStorage.getItem('token');
        }
        try {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${urlApi}/billstopay`,
                headers: {
                    token: token,
                },
                data: {
                    id: bill.id,
                    description: description,
                    value: value,
                    dueDate: dueDate,
                    status: status,
                },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box p={5}>
            <FormControl id="supplier">
                <FormLabel>Fornecedor</FormLabel>
                <Input
                    disabled
                    placeholder="Fornecedor"
                    size="md"
                    mb="2"
                    defaultValue={bill.Supplier.Entity.sampleName}
                />
            </FormControl>
            <FormControl id="description">
                <FormLabel>Descrição</FormLabel>
                <Input
                    placeholder="Descrição"
                    size="md"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    mb="2"
                    defaultValue={bill.description}
                />
            </FormControl>
            <FormControl id="value">
                <FormLabel>Valor</FormLabel>
                <InputMask
                    mask="R$ 999.999,99"
                    maskChar={null}
                    defaultValue={bill.value}
                >
                    {() => (
                        <Input
                            placeholder="Valor"
                            size="md"
                            mb="2"
                            defaultValue={bill.value}
                        />
                    )}
                </InputMask>
            </FormControl>
            <FormControl id="dueDate">
                <FormLabel>Data de vencimento</FormLabel>
                <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    defaultValue={moment(bill.dueDate).format('DD/MM/YYYY')}
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
                <ChakraSelect
                    placeholder="Selecione o status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    mb="2"
                >
                    <option value="1">Em aberto</option>
                    <option value="2">Parcialmente pago</option>
                    <option value="3">Pago</option>
                </ChakraSelect>
            </FormControl>
            <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                    editBill();
                    window.location.reload();
                }}
            >
                Salvar
            </Button>
            <Button colorScheme="red">Cancelar</Button>
        </Box>
    );
};

const DataTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billData, setBillData] = useState([]);
    console.log(JSON.stringify(billData));
    const [totalAmount, setTotalAmount] = useState(0);
    const [dtStartFilter, setDtStartFilter] = useState(
        moment().startOf('month').format('YYYY-MM-DD')
    );
    const [dtEndFilter, setDtEndFilter] = useState(
        moment().endOf('month').format('YYYY-MM-DD')
    );
    let [statusFilter, setStatusFilter] = useState([1, 2, 3]);
    const [isOpen, setIsOpen] = useState(false);
    const [isPartiallyPaid, setIsPartiallyPaid] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [queryFindSuppliers, setQueryFindSuppliers] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [suppliers, setSuppliers] = useState([]);

    const handleCheckboxChange = (setFunction) => (event) => {
        setFunction(event.target.checked);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    let token;
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }

    console.log(statusFilter);

    const filterBillsToPay = async () => {
        let statusFilter = [];
        if (isOpen) {
            statusFilter.push(1);
        }
        if (isPartiallyPaid) {
            statusFilter.push(2);
        }
        if (isPaid) {
            statusFilter.push(3);
        }

        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${urlApi}/billstopay/filters?companyId=${window.localStorage.getItem(
                    'company'
                )}`,
                headers: {
                    token: token,
                },
                params: {
                    company: localStorage.getItem('company'),
                    dtStart: dtStartFilter,
                    dtEnd: dtEndFilter,
                    status: statusFilter,
                },
            };

            const response = await axios
                .request(config)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });

            setBillData(response.data.length > 0 ? response.data : []);
            // Atualize os totais sempre que os dados da conta mudarem
            let total = 0;
            response.data.forEach((item) => {
                total += parseFloat(item.value);
            });
            setTotalAmount(total > 0 ? total : 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatarData = (dueDate) => {
        // Converte a string de data para um objeto Date
        dueDate = moment(dueDate.slice(0, 10), 'YYYY-MM-DD').format(
            'DD/MM/YYYY'
        );
        return dueDate;
    };

    const deleteBill = async (id) => {
        try {
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${urlApi}/billstopay`,
                headers: {
                    token: token,
                },
                params: { id: id },
            };

            await axios
                .request(config)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });

            fetchBillData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchBillData = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${urlApi}/billstopay/filters?companyId=${window.localStorage.getItem(
                    'company'
                )}`,
                headers: {
                    token: token,
                },
                params: {
                    company: localStorage.getItem('company'),
                    dtStart: dtStartFilter,
                    dtEnd: dtEndFilter,
                    status: statusFilter,
                },
            };

            const response = await axios
                .request(config)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });

            setBillData(response.data.length > 0 ? response.data : []);
            let total = 0;
            response.data.forEach((item) => {
                total += parseFloat(item.value);
            });
            setTotalAmount(total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchBillData();
        const socket = io(urlApi);

        socket.on('newAccountPayable', (data) => {
            console.log(data);
            fetchBillData();
        });
        return () => {
            socket.disconnect();
        };

        const delayDebounceFn = setTimeout(() => {
            if (queryFindSuppliers) {
                performSearch();
            }
        }, 300);
    }, [queryFindSuppliers]);
    const performSearch = async () => {
        try {
            await axios
                .get(`${urlApi}/suppliers/filter`, {
                    headers: {
                        token: localStorage.getItem('token'),
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
                        }))
                    );
                });
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    };
    return (
        <Box
            maxH="100vh"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
        >
            <Box flex="1" p={{ base: '10px', md: '40px' }} height="100vh">
                <Box>
                    <Flex justifyContent="flex-end">
                        <ImportBillToPay />
                        <Button mb="4" mr="3" ml="3" onClick={handleOpenModal}>
                            Lançar conta(s)
                        </Button>
                        <Popover>
                            <PopoverTrigger>
                                <Button>Filtros</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Filtro de contas</PopoverHeader>
                                <PopoverBody>
                                    <Box>
                                        <FormLabel>
                                            Vencimento inicial
                                            <Input
                                                type="date"
                                                value={dtStartFilter}
                                                onChange={(e) =>
                                                    setDtStartFilter(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormLabel>
                                        <FormLabel>
                                            Vencimento final
                                            <Input
                                                type="date"
                                                value={dtEndFilter}
                                                mt="1"
                                                onChange={(e) =>
                                                    setDtEndFilter(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormLabel>

                                        {/* <FormControl>
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
                        </FormControl> */}

                                        <CheckboxGroup
                                            colorScheme="purple"
                                            m="5"
                                            defaultChecked
                                        >
                                            <FormLabel>Status</FormLabel>

                                            <Checkbox
                                                onChange={handleCheckboxChange(
                                                    setIsOpen
                                                )}
                                            >
                                                Em aberto
                                            </Checkbox>
                                            <Checkbox
                                                ml="5"
                                                onChange={handleCheckboxChange(
                                                    setIsPartiallyPaid
                                                )}
                                            >
                                                Pago parcialmente
                                            </Checkbox>
                                            <Checkbox
                                                onChange={handleCheckboxChange(
                                                    setIsPaid
                                                )}
                                            >
                                                Pago
                                            </Checkbox>
                                        </CheckboxGroup>
                                    </Box>
                                    <Box mt="5">
                                        <Button
                                            w="100%"
                                            colorScheme="purple"
                                            mr={3}
                                            onClick={() => filterBillsToPay()}
                                        >
                                            Filtrar
                                        </Button>
                                    </Box>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        <Input
                            w="15"
                            ml="4"
                            placeholder="Pesquisar"
                            size="md"
                        />
                    </Flex>
                </Box>

                <Box
                    maxH={'80%'}
                    overflow="auto"
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                >
                    <Table size="sm" boxShadow="xs" rounded="md" bg="white">
                        <Thead
                            style={{
                                position: 'sticky',
                                top: '0',
                                background: 'white',
                                zIndex: '2',
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
                                <Tr key={item.id} _hover={{ bg: 'gray.100' }}>
                                    <Td>{item.description}</Td>
                                    <Td>
                                        {item.value.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
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
                                            else return 'Status desconhecido';
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
                                                    <InputsEditInstallment
                                                        bill={item}
                                                    />
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
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '10px',
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={2}
                        >
                            <Box fontWeight="bold">Total:</Box>
                            <Box fontWeight="bold">
                                {totalAmount.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL',
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
