"use client";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default LoginBtnGoogle = () => {

    return (
        <Button
            variant="outline"
            onClick={() => {
                signIn("google", { callbackUrl: "/SucessLogin" });
            }}
        >
            <Image
                src="/imgs/google.png"
                alt="Google logo"
                width={20}
                height={20}
                marginLeft={-5}
            />
            <span>Entrar com Google</span>
        </Button>
    );
};
