import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";

const Projects = () => {
    return (
        <Box p={8}>
            <Heading mb={4}>Projetos</Heading>
            <SimpleGrid columns={2} spacing={4}>
                <Box>
                    <Heading as="h3" fontSize="lg" mb={2}>
                        Projeto 1
                    </Heading>
                    <Text>Descrição breve do Projeto 1.</Text>
                </Box>
                <Box>
                    <Heading as="h3" fontSize="lg" mb={2}>
                        Projeto 2
                    </Heading>
                    <Text>Descrição breve do Projeto 2.</Text>
                </Box>
                {/* Adicione mais projetos conforme necessário */}
            </SimpleGrid>
        </Box>
    );
};

export default Projects;
