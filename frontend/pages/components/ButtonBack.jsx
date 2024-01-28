import { ArrowBackIcon } from "@chakra-ui/icons";

const ButtonBack = () => {
    return (
        <ArrowBackIcon
            boxSize={10}
            cursor="pointer"
            position={"fixed"}
            top={4}
            left={4}
            onClick={() => window.history.back()}
        />
    );
};

export default ButtonBack;
