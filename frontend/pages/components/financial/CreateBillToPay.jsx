import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
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
    Select,
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

    const toast = useToast();
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
                token: token,
                "Content-Type": "application/json",
            },
            data: expenseData,
        };

        // Envia a requisição usando Axios
        axios
            .request(config)
            .then((response) => {
                toast({
                    title: "Conta criada com sucesso.",
                    description: "Sua nova despesa foi criada com sucesso.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });

                onClose();
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
                            <Select
                                placeholder="Selecione o status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="1">Em aberto</option>
                                <option value="2">Parcialmente pago</option>
                                <option value="3">Pago</option>
                            </Select>
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
