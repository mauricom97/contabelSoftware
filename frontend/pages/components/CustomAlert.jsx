// CustomAlert.js
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";

const CustomAlert = ({ status, title, description }) => (
    <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
    >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
            {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
);

export default CustomAlert;
