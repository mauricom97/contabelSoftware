import { Box, Heading, IconButton, Tooltip, Stack } from "@chakra-ui/react";
import { IoPersonSharp, IoPersonAddSharp } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
    return (
        <Box
            p={4}
            bg="#8046A2"
            color="white"
            display="flex"
            justifyContent="space-between"
            position="fixed"
            w="100%"
            zIndex={10}
        >
            <Heading as="h1" fontSize="2xl">
                Controle Prático
            </Heading>
            <Stack direction="row" spacing={2}>
                <Link href="/login">
                    <Tooltip label="Login" fontSize="md">
                        <IconButton
                            aria-label="Login"
                            icon={<IoPersonSharp />}
                            colorScheme="white"
                            variant="outline"
                        />
                    </Tooltip>
                </Link>
                <Link href="/CreateUser">
                    {" "}
                    {/* Substitua "/register" pelo caminho correto para a página de registro */}
                    <Tooltip label="Criar conta" fontSize="md">
                        <IconButton
                            aria-label="Criar conta"
                            icon={<IoPersonAddSharp />}
                            colorScheme="white"
                            variant="outline"
                        />
                    </Tooltip>
                </Link>
            </Stack>
        </Box>
    );
};

export default Header;
