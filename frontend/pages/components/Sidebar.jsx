import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import urlApi from "../../utils/urlApi";

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
import { SettingsIcon } from "@chakra-ui/icons";

const Sidebar = () => {
    const sidebarRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companiesList, setCompaniesList] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [user, setUser] = useState({});
    const [isOpen, setIsOpen] = useState(true); // Adiciona um estado para controlar a visibilidade da barra lateral

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const setCompany = (e) => {
        localStorage.setItem("company", e);
        window.location.reload();
    };

    let token;
    if (typeof window !== "undefined") {
        token = window.localStorage.getItem("token");
    }
    useEffect(() => {
        let configCompany = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${urlApi}/company`,
            headers: {
                token: token,
            },
        };

        axios
            .request(configCompany)
            .then((response) => {
                setCompaniesList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        const companyId = window.localStorage.getItem("company");
        let configFindCompany = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${urlApi}/company/findCompany?id=${companyId}`,
            headers: {
                token: token,
            },
        };

        axios
            .request(configFindCompany)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCompanyName(response.data.sampleName);
            })
            .catch((error) => {
                console.log(error);
            });

        const userId = window.localStorage.getItem("user");

        let configGetUser = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${urlApi}/user/getUser?id=${userId}`,
            headers: {
                token: token,
            },
        };

        axios
            .request(configGetUser)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        function handleClickOutside(event) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    const mappedCompanies =
        companiesList.length > 0 ? (
            companiesList.map((company) => (
                <MenuItem
                    onClick={() => setCompany(company.id)}
                    key={company.id}
                >
                    <TbBuilding />
                    <span m="3"> {company.sampleName} </span>
                </MenuItem>
            ))
        ) : (
            <MenuItem>Nenhuma empresa cadastrada</MenuItem>
        );

    return (
        <Box
            ref={sidebarRef}
            border={{ base: "none", sm: "1px" }}
            bg="white"
            left={isOpen ? "0" : "-280px"}
            boxShadow="xs"
            p={{ base: "4", sm: "6" }}
            w={{ base: "100%", sm: "300px" }} // Tornando o width responsivo
            h="100vh"
            rounded="md"
            position="fixed"
            zIndex={10}
            transition="left 0.5s ease-in-out"
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
                <span>{user.firstname}</span>
            </Center>
            <Menu>
                <MenuButton w="100%" as={Button}>
                    <Center>
                        <Flex>
                            <Center>
                                <TbBuilding mr="4" />
                                {companyName}
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
            <Box>
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
                            <Text ml="2">Parceiros comerciais</Text>
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

                <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                >
                    <Link href="/reports">
                        <Flex align="center" cursor="pointer">
                            <SettingsIcon size={20} />
                            <Text ml="2">Configurações</Text>
                        </Flex>
                    </Link>
                </Box>
            </Box>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                border={{ base: "none", sm: "1px" }}
                bg={{ base: "none", sm: "white" }}
                style={{
                    position: "fixed",
                    top: "0",
                    left: isOpen ? "280px" : "0",
                    marginTop: "1rem",
                }}
                zIndex={10}
                transition="left 0.5s ease-in-out"
            >
                {" "}
                {isOpen ? "<" : ">"}
            </Button>
        </Box>
    );
};

export default Sidebar;
