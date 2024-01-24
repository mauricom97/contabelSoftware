import Sidebar from "./components/Sidebar";
import { ChakraProvider, Box } from "@chakra-ui/react";
import HomePage from "./HomePage";

const Home = () => {
    return (
        <ChakraProvider>
            {/* <Sidebar></Sidebar>
             */}
            <HomePage />
        </ChakraProvider>
    );
};

export default Home;
