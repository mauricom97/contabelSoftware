import { Card, Text, Box } from "@chakra-ui/react";
import { useEffect } from "react";

const CardsDashboard = (data) => {
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
                <Text>2000</Text>
            </Card>

            <Card style={styleCard} variant={"outline"}>
                <Text as="b">CONTAS A RECEBER</Text>
                <Text>2000</Text>
            </Card>
        </Box>
    );
};

export default CardsDashboard;
