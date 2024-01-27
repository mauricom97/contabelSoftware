import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const ButtonBack = () => {
    return (
        <ArrowBackIcon
            boxSize={10}
            pointer="cursor"
            position={"fixed"}
            top={4}
            left={4}
            onClick={() => window.history.back()}
        />
    );
};

export default ButtonBack;
