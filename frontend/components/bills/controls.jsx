import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import InputMask from 'react-input-mask';
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
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    FormControl,
    FormLabel,
    Checkbox,
    CheckboxGroup,
} from '@chakra-ui/react';
import ImportBillToPay from '../../pages/components/financial/ImportBillToPay';
import CreateBillToPay from '../../pages/components/financial/CreateBillToPay';
import urlApi from '../../utils/urlApi';
import { EditIcon } from '@chakra-ui/icons';
import { DeleteIcon } from '@chakra-ui/icons';

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
                    defaultValue={moment(item.dueDate).format('DD/MM/YYYY')}
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

const ControlsBills = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = (setFunction) => (event) => {
        setFunction(event.target.checked);
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const [dtStartFilter, setDtStartFilter] = useState(
        moment().startOf('month').format('YYYY-MM-DD')
    );
    const [dtEndFilter, setDtEndFilter] = useState(
        moment().endOf('month').format('YYYY-MM-DD')
    );
    const formatarData = (dueDate) => {
        // Converte a string de data para um objeto Date
        dueDate = moment(dueDate.slice(0, 10), 'YYYY-MM-DD').format(
            'DD/MM/YYYY'
        );
        return dueDate;
    };

    let token;
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }

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

    const filterBillsToReceive = async () => {
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
                url: `${urlApi}/billstoreceive/filters?companyId=${window.localStorage.getItem(
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

    const [isOpen, setIsOpen] = useState(false);
    const [isPartiallyPaid, setIsPartiallyPaid] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [billData, setBillData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

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
                            {type === 'billstoreceive'
                                ? 'Criar conta a receber'
                                : 'Criar conta a pagar'}
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
                                            onClick={() => {
                                                return type === 'billstoreceive'
                                                    ? filterBillsToReceive()
                                                    : filterBillsToPay();
                                            }}
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
                                <Th>
                                    {type === 'billstoreceive'
                                        ? 'Cliente'
                                        : 'Fornecedor'}
                                </Th>
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
                                                    {InputsEditInstallment(
                                                        item
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

export default ControlsBills;
