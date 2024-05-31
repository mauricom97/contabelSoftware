import React, { useState, useEffect } from "react";
import CreateEntity from "./components/CreateEntity";
import urlApi from "../utils/urlApi";
import axios from "axios";
import {
    Box,
    Heading,
    SimpleGrid,
    Flex,
    Spacer,
    Text,
    Icon,
    Button,
} from "@chakra-ui/react";
import io from "socket.io-client";

import Sidebar from "../pages/components/Sidebar";

import { FaPhone, FaEnvelope } from "react-icons/fa";

const ListagemEntidades = () => {
    const [entities, setEntities] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    async function fetEntities() {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${urlApi}/entity`,
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            params: {
                company: localStorage.getItem("company"),
            },
        };
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setEntities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        return;
    }

    useEffect(() => {
        fetEntities(entities);

        const socket = io(urlApi);
        socket.on("newEntity", (data) => {
            console.log(data);
            fetEntities();
        });
    }, []);

    return (
        <Box>
            {/* <Sidebar /> */}
            <Box
                p={6}
                position="absolute"
                left="20%"
                top="1%"
                w="70%"
                minH="50%"
            >
                <CreateEntity
                    isOpen={isDrawerOpen}
                    onClose={handleCloseDrawer}
                />
                <Button colorScheme="teal" mb={6} onClick={handleOpenDrawer}>
                    Criar nova entidade
                </Button>
                <Heading as="h2" size="lg" mb={6}>
                    Listagem de Entidades
                </Heading>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
                    {entities.map((entidade) => (
                        <Box
                            key={entidade.id}
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            p={5}
                            bg="white"
                            transition="transform 0.3s ease-in-out"
                            _hover={{
                                cursor: "pointer",
                                transform: "scale(1.05)",
                            }}
                        >
                            <Heading as="h3" size="md" mb={3}>
                                {entidade.sampleName}
                            </Heading>
                            <Flex align="center" mb={3}>
                                <Icon as={FaPhone} color="teal.500" />
                                <Text ml={2}>{entidade.phone}</Text>
                            </Flex>
                            <Flex align="center">
                                <Icon as={FaEnvelope} color="teal.500" />
                                <Text ml={2}>{entidade.email}</Text>
                            </Flex>
                        </Box>
                    ))}
                </SimpleGrid>
                <CreateEntity />
            </Box>
        </Box>
    );
};

export default ListagemEntidades;
