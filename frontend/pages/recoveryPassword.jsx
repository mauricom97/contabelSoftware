import { useState } from "react";
import {
    VStack,
    Box,
    Input,
    Button,
    Heading,
    Text,
    useToast,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const PasswordRecovery = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const handlePasswordRecovery = async () => {
        if (!email) {
            toast({
                title: "Erro",
                description: "Por favor, insira seu e-mail.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            // Substituir pelo endpoint de recuperação de senha
            const response = await fetch("/api/password-recovery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Verifique seu e-mail para redefinir sua senha.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                router.push("/signin"); // Redireciona para a página de login
            } else {
                const error = await response.json();
                throw new Error(error.message || "Erro ao enviar o e-mail.");
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <VStack
            align="center"
            justify="center"
            height="100vh"
            bg="#F5F5F5"
            p={4}
            spacing={6}
        >
            <Box
                w={{ base: "100%", sm: "400px" }}
                bg="white"
                p={8}
                rounded="md"
                boxShadow="lg"
            >
                <Heading as="h1" size="lg" mb={4} textAlign="center">
                    Recuperação de Senha
                </Heading>
                <Text fontSize="sm" mb={4} textAlign="center" color="gray.600">
                    Insira seu e-mail para receber o link de redefinição de senha.
                </Text>
                <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        type="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <Button
                    colorScheme="purple"
                    mt={4}
                    w="full"
                    onClick={handlePasswordRecovery}
                    isLoading={isLoading}
                >
                    Enviar
                </Button>
            </Box>
        </VStack>
    );
};

export default PasswordRecovery;
