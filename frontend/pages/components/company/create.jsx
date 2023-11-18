import React, { useState } from "react";
import axios from "axios";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const CreateCompany = ({ isOpen, onOpen, onClose }) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [sampleName, setSampleName] = useState("");
    const [registerName, setRegisterName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [ie, setIe] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    async function registerCompany() {
        let data = JSON.stringify({
            sampleName: sampleName,
            registerName: registerName,
            cnpj: cnpj,
            ie: ie,
            phone: phone,
            email: email,
            address: address,
            city: city,
            state: state,
        });

        let token;
        if (typeof window !== "undefined") {
            token = window.localStorage.getItem("token");
        }

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:4356/company",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Informações da empresa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>CNPJ</FormLabel>
                            <Input
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                                placeholder="CNPJ"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Razão social</FormLabel>
                            <Input
                                placeholder="Razão social"
                                value={registerName}
                                onChange={(e) =>
                                    setRegisterName(e.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Nome fantasia</FormLabel>
                            <Input
                                placeholder="Nome fantasia"
                                value={sampleName}
                                onChange={(e) => setSampleName(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Inscrição estadual</FormLabel>
                            <Input
                                placeholder="Inscrição estadual"
                                value={ie}
                                onChange={(e) => setIe(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Telefone</FormLabel>
                            <Input
                                placeholder="Telefone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Endereço</FormLabel>
                            <Input
                                placeholder="Endereço"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Cidade</FormLabel>
                            <Input
                                placeholder="Cidade"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Estado</FormLabel>
                            <Input
                                placeholder="Estado"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={() => registerCompany()}
                            colorScheme="blue"
                            mr={3}
                        >
                            Cadastrar empresa
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateCompany;
