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

const CreateBillToPay = ({ isOpen, onOpen, onClose }) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [entity, setEntity] = useState("");
    const [qtde, setQtde] = useState("");

    const registerBill = () => {
        // Construa o objeto com os dados a serem enviados
        const expenseData = {
            description: description,
            amount: parseFloat(amount),
            dueDate: dueDate,
            status: status,
            companyId: 2, // Supondo que companyId seja uma constante ou variável apropriada
        };

        let token;
        if (typeof window !== "undefined") {
            token = window.localStorage.getItem("token");
        }
        // Configuração do Axios
        const config = {
            method: "post",
            url: "http://localhost:4356/billstopay",
            headers: {
                token: token, // Substitua pelo token do usuário logado
                "Content-Type": "application/json",
            },
            data: expenseData,
        };

        // Envia a requisição usando Axios
        axios
            .request(config)
            .then((response) => {
                console.log("Despesa cadastrada com sucesso:", response.data);
                onClose(); // Feche o modal após o cadastro (ajuste conforme necessário)
            })
            .catch((error) => {
                console.error("Erro ao cadastrar despesa:", error);
                // Adicione lógica para lidar com o erro, se necessário
            });
    };

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
                    <ModalHeader>Informações da nova despesa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Descrição</FormLabel>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descrição"
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Data de validade inicial</FormLabel>
                            <Input
                                type="date"
                                placeholder="Data de validade"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Quantidade</FormLabel>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="Quantidade de parcelas"
                                value={qtde}
                                onChange={(e) => setQtde(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Valor</FormLabel>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="Valor"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Fornecedor</FormLabel>
                            <Input
                                type="text"
                                step="0.01"
                                placeholder="Fornecedor"
                                value={entity}
                                onChange={(e) => setEntity(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Input
                                placeholder="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={registerBill}
                            colorScheme="blue"
                            mr={3}
                            disabled={
                                !description || !dueDate || !amount || !status
                            }
                        >
                            Criar despesa
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateBillToPay;
