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
                    <Text m="3"> {company.sampleName} </Text>
                </MenuItem>
            ))
        ) : (
            <MenuItem>Nenhuma empresa cadastrada</MenuItem>
        );

    return (
        <Box
            ref={sidebarRef}
            bg="linear-gradient(to right, #8046A2, #B186C7)"
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
                <MenuButton
                    bg="#8046A2"
                    colorScheme="#8046A2"
                    w="100%"
                    as={Button}
                    _hover={{ bg: "#B186C7" }}
                >
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

            <Box
                mt={5}
                maxH={"60vh"}
                overflow="auto"
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#ccc",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#999",
                    },
                }}
            >
                <Box
                    cursor="pointer"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/Dashboard">
                        <Flex align="center">
                            <FaHome size={25} />
                            <Text ml="2">Home</Text>
                        </Flex>
                    </Link>
                </Box>
                <Box
                    cursor="pointer"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/Entities">
                        <Flex align="center">
                            <BiSolidUserCircle size={25} />
                            <Text ml="2">Parceiros comerciais</Text>
                        </Flex>
                    </Link>
                </Box>
                <Box
                    cursor="pointer"
                    mt="3"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/BillsToPay">
                        <Flex align="center">
                            <GiPayMoney size={25} />
                            <Text ml="2">Contas a Pagar</Text>
                        </Flex>
                    </Link>
                </Box>

                <Box
                    cursor="pointer"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/BillsToReceive">
                        <Flex align="center" cursor="pointer">
                            <GiReceiveMoney size={25} />
                            <Text ml="2">Contas a Receber</Text>
                        </Flex>
                    </Link>
                </Box>

                <Box
                    cursor="pointer"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/PaymentCounter">
                        <Flex align="center">
                            <MdAttachMoney size={25} />
                            <Text ml="2">Caixa</Text>
                        </Flex>
                    </Link>
                </Box>

                <Box
                    cursor="pointer"
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/Reports">
                        <Flex align="center">
                            <FaMoneyBillTrendUp size={25} />
                            <Text ml="2">Relatorios financeiros</Text>
                        </Flex>
                    </Link>
                </Box>

                {/* <Box
                    as="div"
                    p="4"
                    border="1"
                    borderRadius="md"
                    _hover={{ bg: "#B186C7" }}
                >
                    <Link href="/reports">
                        <Flex align="center" cursor="pointer">
                            <SettingsIcon size={25} />
                            <Text ml="2">Configurações</Text>
                        </Flex>
                    </Link>
                </Box> */}
            </Box>

            <Box
                onClick={() => setIsOpen(!isOpen)}
                bg={{ base: "none", sm: "#F5F5F5" }}
                border={{ base: "none", sm: "1px" }}
                style={{
                    cursor: "pointer",
                    position: "fixed",
                    top: "0",
                    left: isOpen ? "280px" : "0",
                    marginTop: "1rem",
                    borderRadius: "50%",
                    padding: "0.2rem",
                    width: "30px",
                    height: "30px",
                }}
                zIndex={10}
                transition="left 0.5s ease-in-out"
            >
                <Text
                    fontSize={10}
                    align={"center"}
                    alignContent={"center"}
                    justifyContent={"center"}
                    mt="1"
                >
                    {" "}
                    {isOpen ? "<" : ">"}
                </Text>
            </Box>
        </Box>
    );
};

export default Sidebar;
