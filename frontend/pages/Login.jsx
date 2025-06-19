import { useState } from "react";
import urlApi from "../utils/urlApi";
import LoginBtnGoogle from './components/LoginBtnGoogle';
import ButtonBack from "./components/ButtonBack";


import {
    Button,
    Input,
    FormControl,
    VStack,
    Image,
    Link,
    Box,
    Heading,
    Flex,
    Divider,
    Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);
    const router = useRouter();

    const emailLogin = async () => {
        const configAuth = {
            type: "email",
            contentAuth: { email, password },
        };
        await fetch(urlApi + "/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(configAuth),
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.id);
                localStorage.setItem("company", data.companyId);
                router.push("/Dashboard");
            } else {
                console.error("Erro ao fazer login:", response.statusText);
            }
        });
    };

    return (
        <Flex
            direction={{ base: "column", md: "row" }} // Coluna em telas pequenas, linha em grandes
            justify="center"
            align="center"
            height="100vh"
            bg="#F5F5F5"
            p={{ base: 4, md: 8 }} // Padding adaptativo
            gap={8} // Espaçamento entre os blocos
        >
            {/* Lado esquerdo - Formulário de Login */}
            <Box
                flex="1"
                maxW={{ base: "100%", md: "400px" }} // Ajuste de largura
                w="full"
                p={8}
                borderBlock={{ base: "none", md: "1px solid #E2E8F0" }}
                bg="white"
                rounded="md"
            >
                <VStack spacing={4}>
                    <Image
                        borderRadius="full"
                        boxSize={{ base: "100px", md: "150px" }} // Tamanho adaptativo da imagem
                        src="/imgs/avatar.png"
                        alt="Avatar"
                    />
                    <Heading fontSize={{ base: "xl", md: "2xl" }} mb={4}>
                        ENTRAR
                    </Heading>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                    />
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => e.key === "Enter" && emailLogin()}
                            placeholder="Password"
                        />
                        <InputRightElement width="4.5rem">
                            <IconButton
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Box textAlign="left" w="full">
                        <Link onClick={() => router.push("/RecoveryPassword")} color="blue.500" fontSize="sm">
                            Esqueci minha senha <ExternalLinkIcon mx="2px" />
                        </Link>
                    </Box>
                    <Button
                        color="white"
                        bg="#8046A2"
                        onClick={emailLogin}
                        _hover={{ bg: "#B186C7" }}
                        w="full"
                    >
                        LOGIN
                    </Button>
                </VStack>
            </Box>

            {/* Divisor Vertical (apenas em telas maiores) */}
            <Divider
                orientation="vertical"
                display={{ base: "none", md: "block" }}
                h="80%"
            />

            {/* Lado direito - Formas de autenticação */}
            <Box
                flex="1"
                maxW={{ base: "100%", md: "400px" }}
                w="full"
                p={8}
                bg="white"
                rounded="md"
                borderBlock={{ base: "none", md: "1px solid #E2E8F0" }}
            >
                <VStack spacing={4}>
                    <Heading textTransform="uppercase" fontSize={{ base: "lg", md: "xl"}} mb={4} textAlign="center">
                        ou entre com
                    </Heading>
                    <LoginBtnGoogle />
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                        Não possui uma conta?{" "}
                        <Link color="blue.500" onClick={() => router.push("/CreateUser")}>
                            Cadastre-se
                        </Link>
                    </Text>
                </VStack>
            </Box>
            <Link onClick={() => router.push("/")}>
                <ButtonBack />
            </Link>
        </Flex>
    );
};

