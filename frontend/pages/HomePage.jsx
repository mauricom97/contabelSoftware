import {
    ChakraProvider,
    Box,
    Flex,
    Button,
    useMediaQuery,
    Heading,
    Text,
    Image,
} from "@chakra-ui/react";
import Header from "./components/Header";
import React, { useState } from "react";

import AboutMe from "./components/AboutMe";
import Link from "next/link";

import Projects from "./components/Projects";
import Footer from "./components/Footer";

const HomePage = () => {
    return (
        <ChakraProvider>
            <Flex direction="column">
                <Box h="100vh">
                    <Header />

                    <Box w="100%" h="100vh" flex="1">
                        <ContactUs />
                    </Box>

                    <Footer position="fixed" w="100%" zIndex="1" bottom="0" />
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default HomePage;

const ContactUs = () => {
    const [emojiMoneyFinan, setEmojiMoneyFinan] = useState("💰");
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    return (
        <Box
            p={isLargerThan768 ? "5%" : "10%"} // Ajuste de padding responsivo
            style={{ position: "absolute" }}
            mt={isLargerThan768 ? "0" : "10%"}
            bg="rgba(177, 134, 199, 0.5)"
            color="white"
            display="flex"
            justifyContent={isLargerThan768 ? "space-between" : "center"} // Ajuste de alinhamento responsivo
            alignItems="center"
            w="100%"
            h="100%"
            flexDirection={isLargerThan768 ? "row" : "column"} // Ajuste de direção responsivo
        >
            <Box
                style={{
                    flex: isLargerThan768 ? 1 : "none",
                    marginRight: isLargerThan768 ? "2rem" : 0,
                }}
            >
                <img
                    src="/imgs/money-amico.svg"
                    style={{
                        width: isLargerThan768 ? "75%" : "100%",
                        height: isLargerThan768 ? "70%" : "auto",
                    }} // Ajuste de tamanho da imagem responsivo
                    alt="Imagem"
                />
            </Box>
            <Box
                textAlign="center"
                style={{
                    zIndex: "2",
                    flex: 1,
                    padding: isLargerThan768 ? "20px" : 0,
                }} // Ajuste de estilo responsivo
            >
                <Box
                    as="h1"
                    fontSize={isLargerThan768 ? "4xl" : "2xl"} // Ajuste de tamanho de fonte responsivo
                    fontWeight="bold"
                    lineHeight="1.2"
                    mb={4}
                >
                    Crie sua conta e inicie a gestão financeira da sua empresa{" "}
                    {emojiMoneyFinan}
                </Box>

                <Link href="/CreateUser">
                    <Button
                        size="md"
                        height="48px"
                        width="200px"
                        border="2px"
                        borderColor="#8046A2"
                    >
                        CRIAR MINHA CONTA
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

const Benefits = () => {
    return (
        <Box
            p={10}
            bg="rgba(87, 169, 197, 0.5)"
            color="white"
            textAlign="center"
        >
            <Heading fontSize="3xl" mb={6}>
                Benefícios
            </Heading>
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
            >
                <Box flex="1" mb={{ base: 6, md: 0 }}>
                    <Image
                        src="/imgs/benefit1.svg"
                        alt="Benefício 1"
                        mx="auto"
                        mb={4}
                    />
                    <Heading fontSize="xl" mb={2}>
                        Benefício 1
                    </Heading>
                    <Text>
                        Descreva aqui os detalhes do primeiro benefício
                        oferecido.
                    </Text>
                </Box>
                <Box flex="1" mb={{ base: 6, md: 0 }}>
                    <Image
                        src="/imgs/benefit2.svg"
                        alt="Benefício 2"
                        mx="auto"
                        mb={4}
                    />
                    <Heading fontSize="xl" mb={2}>
                        Benefício 2
                    </Heading>
                    <Text>
                        Descreva aqui os detalhes do segundo benefício
                        oferecido.
                    </Text>
                </Box>
                <Box flex="1">
                    <Image
                        src="/imgs/benefit3.svg"
                        alt="Benefício 3"
                        mx="auto"
                        mb={4}
                    />
                    <Heading fontSize="xl" mb={2}>
                        Benefício 3
                    </Heading>
                    <Text>
                        Descreva aqui os detalhes do terceiro benefício
                        oferecido.
                    </Text>
                </Box>
            </Flex>
            <Link href="/CreateUser">
                <Button
                    mt={8}
                    size="md"
                    height="48px"
                    width="200px"
                    border="2px"
                    borderColor="#57a9c5"
                >
                    CRIAR MINHA CONTA
                </Button>
            </Link>
        </Box>
    );
};
