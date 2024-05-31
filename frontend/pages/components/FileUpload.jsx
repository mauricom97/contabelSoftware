// components/FileUpload.js
import { useState, useCallback } from "react";
import urlApi from "../../utils/urlApi";
import axios from "axios";
import {
    Box,
    Button,
    Text,
    useToast,
    VStack,
    Spinner,
    useColorModeValue,
    Icon,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiFile } from "react-icons/fi";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setMessage("");
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const handleUpload = async () => {
        if (!file) {
            setMessage("Por favor, selecione um arquivo primeiro.");
            toast({
                title: "Nenhum arquivo selecionado.",
                description: "Por favor, selecione um arquivo primeiro.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setIsLoading(true); // Set loading to true

        try {
            const response = await axios.post(
                `${urlApi}/upload/sheetFiles`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token: localStorage.getItem("token"),
                    },
                },
            );

            if (response.status === 200) {
                toast({
                    title: "Sucesso!",
                    description:
                        "Arquivo enviado com sucesso, notificaremos por email quando estiver pronto.",
                    status: "success",
                    duration: 8000,
                    isClosable: true,
                });
            } else {
                setMessage("Erro ao enviar o arquivo.");
                toast({
                    title: "Erro!",
                    description: "Erro ao enviar o arquivo.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            setMessage("Erro ao enviar o arquivo.");
            toast({
                title: "Erro!",
                description: "Erro ao enviar o arquivo.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Set loading to false after request is complete
        }
    };

    const dropZoneStyle = {
        border: "2px dashed",
        borderColor: useColorModeValue("gray.300", "gray.500"),
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        transition: "border-color 0.3s ease-in-out",
        cursor: "pointer",
        backgroundColor: isDragActive
            ? useColorModeValue("gray.100", "gray.700")
            : "transparent",
    };

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            maxWidth="500px"
            mx="auto"
            mt="50px"
        >
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <VStack spacing={4}>
                    <Box {...getRootProps()} style={dropZoneStyle}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <Text>Solte o arquivo aqui...</Text>
                        ) : (
                            <Text>
                                Arraste e solte um arquivo aqui ou clique para
                                selecionar
                            </Text>
                        )}
                        {file && (
                            <Box
                                mt={4}
                                p={2}
                                borderWidth="1px"
                                borderRadius="md"
                                w="100%"
                                textAlign="left"
                            >
                                <Icon as={FiFile} mr={2} />
                                <Text as="span" fontWeight="bold">
                                    {file.name}
                                </Text>
                            </Box>
                        )}
                    </Box>
                    <Button
                        colorScheme="teal"
                        onClick={handleUpload}
                        isDisabled={isLoading}
                    >
                        {isLoading ? <Spinner size="sm" /> : "Upload"}
                    </Button>
                    {message && <Text>{message}</Text>}
                </VStack>
            </motion.div>
        </Box>
    );
};

export default FileUpload;
