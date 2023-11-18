import { useState } from "react";
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4356/user/login",
                {
                    email,
                    password,
                },
            );

            console.log(response.data);
            localStorage.setItem("token", response.data.token);
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
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="filled"
                        placeholder="Email"
                    />
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="filled"
                        placeholder="Password"
                    />
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
