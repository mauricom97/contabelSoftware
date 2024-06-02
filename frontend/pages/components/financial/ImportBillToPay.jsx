import {
    Modal,
    Box,
    Text,
    Link,
    VStack,
    Icon,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { FiDownloadCloud } from "react-icons/fi";
import { motion } from "framer-motion";
import FileUpload from "../FileUpload";

const ImportBillToPay = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Importar conta(s)</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Importação de contas</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box
                                p={5}
                                borderWidth="1px"
                                borderRadius="md"
                                maxWidth="500px"
                                mx="auto"
                                mt="50px"
                                bg={useColorModeValue("white", "gray.800")}
                                textAlign="center"
                            >
                                <VStack spacing={4}>
                                    <Icon
                                        as={FiDownloadCloud}
                                        w={10}
                                        h={10}
                                        color="teal.500"
                                    />
                                    <Text fontSize="lg" fontWeight="bold">
                                        Baixe nosso modelo de planilha usado
                                        para fazer as importações.
                                    </Text>
                                    <Link
                                        href="link_para_o_modelo_de_planilha"
                                        color="teal.500"
                                        fontWeight="bold"
                                        isExternal
                                    >
                                        Acesse o link para acessar.
                                    </Link>
                                </VStack>
                            </Box>
                        </motion.div>
                        <FileUpload />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImportBillToPay;
