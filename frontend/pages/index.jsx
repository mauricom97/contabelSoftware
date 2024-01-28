import Sidebar from "./components/Sidebar";
import { ChakraProvider, Box } from "@chakra-ui/react";
import HomePage from "./HomePage";

const Home = () => {
    return (
        <ChakraProvider>
            <HomePage />
        </ChakraProvider>
    );
};

export default Home;
