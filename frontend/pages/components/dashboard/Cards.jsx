import { Card, Text, Box } from "@chakra-ui/react";

const CardsDashboard = () => {
    const styleCard = {
        width: "250px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        margin: "10px",
        shadow: "none",
    };

    return (
        <Box display="flex" alignItems="center" justifyContent={"center"}>
            <Card style={styleCard} variant={"outline"}>
                <Text as="b">CONTAS A PAGAR</Text>
                <Text>R$ 5.000,00</Text>
            </Card>

            <Card style={styleCard} variant={"outline"}>
                <Text as="b">CONTAS A RECEBER</Text>
                <Text>R$ 8.000,00</Text>
            </Card>
        </Box>
    );
};

export default CardsDashboard;
