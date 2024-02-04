import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Index = ({ children }) => {
    return (
        <Box>
            <Sidebar />
            <Box flex="1" p="4">
                {children}
            </Box>
        </Box>
    );
};

export default Index;
