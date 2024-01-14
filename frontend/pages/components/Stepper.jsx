// pages/SignUp.js
import React from "react";
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
} from "@chakra-ui/react";

const SignUp = () => {
    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch" mx="auto" maxW="400px">
                <Heading as="h2" size="xl">
                    Crie sua conta
                </Heading>
                <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input type="text" placeholder="Seu nome" />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Seu email" />
                </FormControl>
                <FormControl>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" placeholder="Sua senha" />
                </FormControl>
                <Button colorScheme="blue" type="submit">
                    Criar conta
                </Button>
            </VStack>
        </Box>
    );
};

export default SignUp;
