// pages/SignUp.js
import axios from "axios";
import urlApi from "../utils/urlApi";
import React, { useState } from "react";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import ButtonBack from "./components/ButtonBack";

import {
    Box,
    Heading,
    FormControl,
    Input,
    Button,
    VStack,
    Image,
    Link,
} from "@chakra-ui/react";

const SignUp = () => {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataAniversario, setDataAniversario] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

    const validityDataUser = async () => {
        if (
            !nome ||
            !sobrenome ||
            !dataAniversario ||
            !celular ||
            !email ||
            !senha ||
            !confirmacaoSenha
        )
            return alert("Preencha todos os campos");

        if (senha !== confirmacaoSenha) return alert("Senhas não conferem");

        await registerUser();
    };

    const registerUser = async () => {
        try {
            const newUser = {
                firstname: nome,
                lastname: sobrenome,
                birthdate: dataAniversario,
                phone: celular,
                email: email,
                password: senha,
            };
            const response = await axios
                .post(`${urlApi}/user`, newUser)
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", response.data.id);
                    router.push("/CreateCompany");
                });
        } catch (error) {
            console.error(error);
            alert("Erro ao criar conta. Tente novamente.", JSON.stringify(error));
            // Handle errors as needed
        }
    };

    return (
        <Box p={4} bg="#F5F5F5">
            <VStack spacing={4} align="center" mx="auto" maxW="400px">
                <Image
                    borderRadius="full"
                    boxSize="250px"
                    src="/imgs/avatarWhite.png"
                />
                <Heading as="h2" size="xl">
                    CRIE SUA CONTA
                </Heading>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="date"
                        placeholder="Data de aniversario"
                        value={dataAniversario}
                        onChange={(e) => setDataAniversario(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <InputMask
                        mask="(99) 99999-9999"
                        maskChar="_"
                        onChange={(e) => setCelular(e.target.value)}
                    >
                        {(inputProps) => (
                            <Input
                                {...inputProps}
                                placeholder="Telefone celular"
                            />
                        )}
                    </InputMask>
                </FormControl>
                <FormControl>
                    <Input
                        type="e-mail"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="password"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        value={confirmacaoSenha}
                        onChange={(e) => setConfirmacaoSenha(e.target.value)}
                    />
                </FormControl>
                <Button
                    color={"white"}
                    bg="#8046A2"
                    onClick={validityDataUser}
                    _hover={{ bg: "#B186C7" }}
                >
                    CRIAR CONTA
                </Button>
            </VStack>
            <Link onClick={() => window.history.back()}>
                <ButtonBack />
            </Link>
        </Box>
    );
};

export default SignUp;
