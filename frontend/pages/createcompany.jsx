import { useState } from "react";
import urlApi from "../utils/urlApi";
import { useRouter } from "next/router";

import {
    Box,
    FormControl,
    Input,
    Button,
    Heading,
    VStack,
    Image,
} from "@chakra-ui/react";
import axios from "axios";
import ButtonBack from "./components/ButtonBack";

export default function Company() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        sampleName: "",
        registerName: "",
        cnpj: "",
        ie: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        await axios
            .post(`${urlApi}/company`, formData, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                router.push("/dashboard");
                localStorage.setItem("company", response.data.id);
            });
    };

    return (
        <Box p={4} bg="#F5F5F5">
            <VStack spacing={4} align="center" mx="auto" maxW="400px">
                <Image
                    borderRadius="full"
                    boxSize="250px"
                    src="/imgs/company.png"
                />
                <Heading as="h2" size="xl">
                    CRIE SUA EMPRESA
                </Heading>
                <FormControl>
                    <Input
                        placeholder="Razão social"
                        name="registerName"
                        value={formData.registerName}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <Input
                        placeholder="Nome fantazia"
                        name="sampleName"
                        value={formData.sampleName}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="CNPJ"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="Inscrição social"
                        name="ie"
                        value={formData.ie}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="Telefone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="Endereço"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="Cidade"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl>
                    <Input
                        placeholder="Estado"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </FormControl>

                <Button
                    color={"white"}
                    bg="#8046A2"
                    onClick={handleSubmit}
                    _hover={{ bg: "#B186C7" }}
                >
                    CREATE COMPANY
                </Button>
            </VStack>
            <ButtonBack />
        </Box>
    );
}
