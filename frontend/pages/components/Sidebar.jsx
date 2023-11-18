import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { TbBuilding } from "react-icons/tb";
import { FaRegPlusSquare } from "react-icons/fa";
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
import { AiOutlineDollar, AiOutlineArrowRight } from "react-icons/ai";

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
            boxShadow="md"
            p="6"
            w="15%"
            maxW="15%"
            h="100vh"
            rounded="md"
            bg="white"
        >
            <Center mb="4">
                <WrapItem>
                    <Avatar
                        size="xl"
                        name="Dan Abrahmov"
                        src="https://bit.ly/sage-adebayo"
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
                mt="3"
                as="div"
                p="4"
                border="1"
                borderRadius="md"
                _hover={{ bg: "gray.100" }}
            >
                <Link href="/billstopay">
                    <Flex align="center" cursor="pointer">
                        <AiOutlineDollar size={20} />
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
                        <AiOutlineArrowRight size={20} />
                        <Text ml="2">Contas a Receber</Text>
                    </Flex>
                </Link>
            </Box>
        </Box>
    );
};

export default Sidebar;
