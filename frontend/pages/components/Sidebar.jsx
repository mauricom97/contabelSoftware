import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import CreateCompany from "../components/company/create";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text,
    Avatar,
    WrapItem,
    Box,
    Center,
    Flex,
    Divider,
} from "@chakra-ui/react";
import { TbBuilding } from "react-icons/tb";
import { FaRegPlusSquare, FaHome } from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BiSolidUserCircle } from "react-icons/bi";

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companiesList, setCompaniesList] = useState([]);

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

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "http://localhost:4356/company",
            headers: {
                token: token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                setCompaniesList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const mappedCompanies =
        companiesList.length > 0 ? (
            companiesList.map((company) => (
                <MenuItem key={company.companyId}>
                    <TbBuilding />
                    <span m="3"> {company.company.sampleName} </span>
                </MenuItem>
            ))
        ) : (
            <MenuItem>Nenhuma empresa cadastrada</MenuItem>
        );

    return (
        <Box
            boxShadow="xs"
            p="6"
            w="25%"
            maxW="20%"
            h="100vh"
            rounded="md"
            bg="white"
        >
            <Center mb="4">
                <WrapItem>
                    <Avatar
                        size="xl"
                        name="Dan Abrahmov"
                        src="https://bit.ly/ryan-florence"
                    />
                </WrapItem>
            </Center>
            <Center mb="5">
                <span>Mauricio Nunes</span>
            </Center>
            <Menu>
                <MenuButton w="100%" as={Button}>
                    <Center>
                        <Flex>
                            <Center>
                                <TbBuilding mr="4" />
                                Fredy Pneus
                            </Center>
                        </Flex>
                    </Center>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleOpenModal}>
                        <Flex>
                            <Center>
                                <FaRegPlusSquare />
                                Criar nova empresa
                            </Center>
                        </Flex>
                    </MenuItem>
                    {mappedCompanies}
                </MenuList>
            </Menu>
            <CreateCompany
                isOpen={isModalOpen}
                onOpen={handleOpenModal}
                onClose={handleCloseModal}
            />
            <Divider mt="5" />
            <Box
                overflowY="auto"
                maxHeight="90vh" // Ajuste este valor conforme necessário
            >
                <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/dashboard">
                        <Flex align="center" cursor="pointer">
                            <FaHome size={20} />
                            <Text ml="2">Home</Text>
                        </Flex>
                    </Link>
                </Box>
                <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/entities">
                        <Flex align="center" cursor="pointer">
                            <BiSolidUserCircle size={20} />
                            <Text ml="2">Entidades</Text>
                        </Flex>
                    </Link>
                </Box>
                <Box
                    mt="3"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/billstopay">
                        <Flex align="center" cursor="pointer">
                            <GiPayMoney size={20} />
                            <Text ml="2">Contas a Pagar</Text>
                        </Flex>
                    </Link>
                </Box>

                <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/billstoreceive">
                        <Flex align="center" cursor="pointer">
                            <GiReceiveMoney size={20} />
                            <Text ml="2">Contas a Receber</Text>
                        </Flex>
                    </Link>
                </Box>

                <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/paymentCounter">
                        <Flex align="center" cursor="pointer">
                            <MdAttachMoney size={20} />
                            <Text ml="2">Caixa</Text>
                        </Flex>
                    </Link>
                </Box>

                <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/reports">
                        <Flex align="center" cursor="pointer">
                            <FaMoneyBillTrendUp size={20} />
                            <Text ml="2">Relatorios financeiros</Text>
                        </Flex>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
