import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    SimpleGrid,
} from "@chakra-ui/react";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

const HomePage = () => {
    return (
        <ChakraProvider>
            <Box>
                <Header />

                <Box p={8}>
                    <AboutMe />

                    <Projects />
                </Box>

                <Footer />
            </Box>
        </ChakraProvider>
    );
};

export default HomePage;
