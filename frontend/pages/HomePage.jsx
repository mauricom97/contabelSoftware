import {
    ChakraProvider,
    Box,
    Flex,
    Button,
    useMediaQuery,
    Heading,
    Text,
    Image,
    Tooltip,
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
                        <CreateAccount />
                        <Benefits />
                        <ContactInfo />
                        {/* <WhatsappButton /> */}
                    </Box>

                    {/* <Footer position="fixed" w="100%" zIndex="1" bottom="0" /> */}
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default HomePage;

const CreateAccount = () => {
    const [emojiMoneyFinan, setEmojiMoneyFinan] = useState("💰");
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    return (
        <Box
            p={isLargerThan768 ? "5%" : "10%"} // Ajuste de padding responsivo
            style={{ position: "relative" }}
            mt={isLargerThan768 ? "0" : "10%"}
            bg="rgba(177, 134, 199, 0.5)"
            color="white"
            display="flex"
            justifyContent={isLargerThan768 ? "space-between" : "center"} // Ajuste de alinhamento responsivo
            alignItems="center"
            w="100%"
            h="85%"
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
                    CRIE SUA CONTA, E INICIE A GESTÃO FINANCEIRA DA SUA EMPRESA{" "}
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
            bg="#F5F5F5"
            color="#8046A2"
            textAlign="center"
            position="relative"
        >
            <Heading fontSize="3xl" mb={6}>
                BENEFÍCIOS
            </Heading>
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
            >
                <Box flex="1" mb={{ base: 6, md: 0 }}>
                    <Image
                        src="/imgs/control-finan.svg"
                        alt="Benefício 1"
                        mx="auto"
                        mb={4}
                    />
                    <Heading fontSize="xl" mb={2}>
                        Controle financeiro
                    </Heading>
                    <Text>
                        Tenha controle total sobre as finanças da sua empresa.
                    </Text>
                </Box>
                <Box flex="1" mb={{ base: 6, md: 0 }}>
                    <Image
                        src="/imgs/financial-strategies.svg"
                        alt="Benefício 2"
                        mx="auto"
                        mb={4}
                    />
                    <Heading fontSize="xl" mb={2}>
                        Visualizações estrategicas financeira
                    </Heading>
                    <Text>
                        Tenha acesso a visualizações estratégicas sobre as
                        finanças da sua empresa.
                    </Text>
                </Box>
                <Box flex="1">
                    <Image
                        src="/imgs/consultative-finance.svg"
                        alt="Benefício 3"
                        mx="auto"
                        mb={4}
                    />
                    <Heading fontSize="xl" mb={2}>
                        Colaboração da sua equipe na plataforma
                    </Heading>
                    <Text>
                        Tenha colaboração da sua equipe na plataforma, para
                        melhorar a gestão financeira da sua empresa.
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
                    borderColor="#8046A2"
                >
                    CRIAR MINHA CONTA
                </Button>
            </Link>
        </Box>
    );
};

const ContactInfo = () => {
    return (
        <Box p={10} bg="#333333" color="white" textAlign="center">
            <Heading fontSize="3xl" mb={6}>
                CONTATO
            </Heading>
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
            >
                <Box flex="1" mb={{ base: 6, md: 0 }}>
                    <Heading fontSize="xl" mb={2}>
                        Endereço
                    </Heading>
                    <Text>
                        São Firmino, 603 <br />
                        Joinville, SC <br />
                        CEP: 89237-356
                    </Text>
                </Box>
                <Box flex="1" mb={{ base: 6, md: 0 }}>
                    <Heading fontSize="xl" mb={2}>
                        E-mail
                    </Heading>
                    <Link href="mailto:contato.mauricionunes@gmail.com">
                        <Text color="#007bff">
                            contato.mauricionunes@gmail.com
                        </Text>
                    </Link>
                </Box>
                <Box flex="1">
                    <Heading fontSize="xl" mb={2}>
                        Telefone
                    </Heading>
                    <Text>+55 47 9-92184165</Text>
                </Box>
            </Flex>
        </Box>
    );
};
