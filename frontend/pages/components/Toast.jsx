import { useToast } from "@chakra-ui/react";

const Toast = ({ message, status }) => {
    const toast = useToast();
    toast({
        title: message.title,
        description: message.description,
        status: status,
        duration: 9000,
        isClosable: true,
    });
};

export default Toast;
