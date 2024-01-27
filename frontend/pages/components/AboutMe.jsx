import { Box, Heading, Text, Image } from "@chakra-ui/react";

const AboutSoftware = () => {
    return (
        <Box p={8}>
            <Heading mb={4}>Sobre o Software</Heading>
            <Box
                display={{ md: "flex" }}
                justifyContent={{ md: "space-between" }}
                alignItems={{ md: "center" }}
            >
                <Box flexBasis={{ md: "50%" }} mb={{ base: 4, md: 0 }}>
                    <Text>
                        Nosso software de gestão financeira foi projetado para
                        oferecer uma experiência eficiente e intuitiva na
                        administração das finanças pessoais e empresariais. Com
                        recursos avançados e uma interface amigável, estamos
                        comprometidos em simplificar a complexidade das
                        finanças.
                    </Text>
                </Box>
                <Box flexBasis={{ md: "50%" }} textAlign={{ md: "center" }}>
                    <Image
                        src="/imgs/contadinhoUsandoComputador.jpeg" // Substitua com o caminho da sua imagem
                        alt="Imagem do Software"
                        borderRadius="md"
                        boxSize={{ base: "150px", md: "200px" }}
                        mb={{ base: 4, md: 0 }}
                    />
                </Box>
            </Box>
            <Text mt={4}>
                Oferecemos recursos como rastreamento de despesas, geração de
                relatórios financeiros detalhados e integração simplificada com
                diversas contas bancárias. Nossa missão é ajudar nossos usuários
                a alcançarem uma gestão financeira sólida e bem-sucedida.
            </Text>
        </Box>
    );
};

export default AboutSoftware;
