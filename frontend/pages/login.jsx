import { useState } from "react";
import urlApi from "../utils/urlApi";
import LoginBtn from "./components/LoginBtn";
import { LoginBtnGoogle } from "./components/LoginBtnGoogle";

import {
    Button,
    Input,
    FormControl,
    VStack,
    Image,
    Link,
    Box,
    Heading,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ButtonBack from "./components/ButtonBack";
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import authUtils from "../utils/authUtils";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);
    const router = useRouter();

    const emailLogin = async () => {
        const response = await authUtils("email", { email, password });
        if (response?.data?.token) {
            return router.push("/dashboard");
        };
    };

    return (
        <VStack justify="center" height="100vh" bg="#F5F5F5">
            <FormControl w="full" maxW="md" p={8} rounded="md">
                <VStack spacing={4}>
                    <Image
                        borderRadius="full"
                        boxSize="250px"
                        src="/imgs/avatar.png"
                    />
                    <Heading fontSize="3xl" mb={6}>
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
                            onKeyUp={(e) => {
                                if (e.key === "Enter") emailLogin();
                            }}
                            placeholder="Password"
                        />
                        <InputRightElement width="4.5rem">
                            <IconButton
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                                icon={
                                    showPassword ? (
                                        <ViewOffIcon />
                                    ) : (
                                        <ViewIcon />
                                    )
                                }
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Box textAlign="left">
                        <Link href="https://chakra-ui.com" isExternal>
                            Esqueci minha senha <ExternalLinkIcon mx="2px" />
                        </Link>
                    </Box>
                    <LoginBtnGoogle />
                    <Button
                        color={"white"}
                        bg="#8046A2"
                        onClick={emailLogin}
                        _hover={{ bg: "#B186C7" }}
                    >
                        LOGIN
                    </Button>
                </VStack>
            </FormControl>
            <ButtonBack />
        </VStack>
    );
};

export default Login;
