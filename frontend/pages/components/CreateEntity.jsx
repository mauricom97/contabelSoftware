import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Box,
    FormLabel,
    Input,
    Button,
    Select,
    useToast,
    Checkbox,
    CheckboxGroup,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import urlApi from "../../utils/urlApi";

function CreateEntity({ isOpen, onOpen, onClose }) {
    const toast = useToast();

    const firstField = React.useRef();

    const [cpfCnpj, setCpfCnpj] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [sampleName, setSampleName] = useState("");
    const [ie, setIe] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [isSupplier, setIsSupplier] = useState(false);

    const handleCheckboxChange = () => {
        setIsSupplier(!isSupplier);
    };

    const options = [
        { name: "Juridica", value: "J" },
        { name: "Fisica", value: "F" },
    ];
    const [typeEntity, setTypeEntity] = useState(options[0].value);

    const registerEntity = () => {
        const axios = require("axios");
        let data = JSON.stringify({
            type: typeEntity,
            cpfCnpj: cpfCnpj,
            registerName: registerName,
            sampleName: sampleName,
            ie: ie,
            phone: phone,
            email: email,
            address: address,
            city: city,
            state: state,
            isSupplier: isSupplier,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${urlApi}/entity`,
            headers: {
                token: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                toast({
                    title: "Entidade criada com sucesso.",
                    description: "Nova entidade criada com sucesso.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });

                onClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                initialFocusRef={firstField}
                onClose={onClose}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Cadastro de entidade
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="type">
                                    Tipo de entidade
                                </FormLabel>
                                <Select
                                    value={typeEntity}
                                    onChange={(e) =>
                                        setTypeEntity(e.target.value)
                                    }
                                    placeholder="Selecione uma opção"
                                >
                                    {options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </Select>
                            </Box>
                            <Box>
                                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                                    <GridItem h="10">
                                        <Checkbox defaultChecked>
                                            Cliente
                                        </Checkbox>
                                    </GridItem>
                                    <GridItem h="10">
                                        <Checkbox
                                            defaultChecked
                                            isChecked={isSupplier}
                                            onChange={handleCheckboxChange}
                                        >
                                            Fornecedor
                                        </Checkbox>
                                    </GridItem>
                                </Grid>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
                                <Input
                                    value={cpfCnpj}
                                    onChange={(e) => setCpfCnpj(e.target.value)}
                                    id="cnpj"
                                    placeholder="CNPJ"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="registername">
                                    Razão social
                                </FormLabel>
                                <Input
                                    value={registerName}
                                    onChange={(e) =>
                                        setRegisterName(e.target.value)
                                    }
                                    id="registername"
                                    placeholder="Razão social"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="samplename">
                                    Nome fantasia
                                </FormLabel>
                                <Input
                                    value={sampleName}
                                    onChange={(e) =>
                                        setSampleName(e.target.value)
                                    }
                                    id="samplename"
                                    placeholder="Nome fantasia"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="ie">
                                    Inscrição estadual
                                </FormLabel>
                                <Input
                                    value={ie}
                                    onChange={(e) => setIe(e.target.value)}
                                    id="samplename"
                                    placeholder="Inscrição estadual"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="phone">Telefone</FormLabel>
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    id="samplename"
                                    placeholder="Telefone"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="email">E-mail</FormLabel>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="samplename"
                                    placeholder="E-mail"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="address">
                                    Endereço
                                </FormLabel>
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    id="samplename"
                                    placeholder="Endereço"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="city">Cidade</FormLabel>
                                <Input
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    id="samplename"
                                    placeholder="Cidade"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="state">Estado</FormLabel>
                                <Input
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    id="samplename"
                                    placeholder="Estado"
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={registerEntity}>
                            Criar entidade
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
export default CreateEntity;
