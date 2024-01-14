import { useState } from "react";
import urlApi from "../utils/urlApi";

import {
    Button,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Image,
    Link,
    Box,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${urlApi}/user/login`, {
                email,
                password,
            });

            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.id);
            router.push("/dashboard");

            // Add additional logic after login if necessary
        } catch (error) {
            console.error(error);
            // Handle errors as needed
        }
    };

    return (
        <VStack justify="center" height="100vh">
            <FormControl
                w="full"
                maxW="md"
                bg="white"
                p={8}
                rounded="md"
                boxShadow="md"
            >
                <VStack spacing={4}>
                    <Image
                        borderRadius="full"
                        boxSize="150px"
                        src="https://bit.ly/dan-abramov"
                        alt="Dan Abramov"
                    />
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="filled"
                        placeholder="example@domain.com"
                    />
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="filled"
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
                    <Button
                        colorScheme="blue"
                        onClick={handleLogin}
                        _hover={{ bg: "blue.700" }}
                    >
                        Sign In
                    </Button>
                </VStack>
            </FormControl>
        </VStack>
    );
};

export default Login;
