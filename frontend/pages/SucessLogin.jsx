import { useRouter } from "next/router";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import axios from "axios";
import urlApi from "../utils/urlApi";
import React, { useRef, useState, useEffect } from "react";




// Componente animado com Framer Motion
const MotionBox = motion(Box);

export default function SuccessScreen() {
    const router = useRouter();

    const { data: session } = useSession();
    
    
    const content = { type: "google", email: session?.user?.email };
    axios
        .post(`${urlApi}/user/login`, {
            content,
        })
        .then((auth) => {
            alert(JSON.stringify(auth));
            // const content = setContentLocalStorage(auth);
        }
        )

    function clearLocalStorage() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("company");
    }
    function setContentLocalStorage(auth) {
        localStorage.setItem("token", auth.data.token);
        localStorage.setItem("user", auth.data.id);
        localStorage.setItem("company", auth.data.companyId);
        return {
            token: auth.data.token,
            user: auth.data.id,
            company: auth.data.companyId,
        };
    }
    useEffect(() => {

        const timer = setTimeout(() => {
            router.push("/dashboard"); // Altere para a rota desejada
        }, 5000);

        return () => clearTimeout(timer); // Cleanup do timer
    }, [router]);

    return (
        <VStack
            height="100vh"
            justify="center"
            align="center"
            bg="teal.50"
            spacing={6}
        >
            {/* Ícone Animado */}
            <MotionBox
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Icon as={CheckCircleIcon} boxSize={32} color="teal.400" />
            </MotionBox>

            {/* Mensagem de Sucesso */}
            <Text fontSize="3xl" fontWeight="bold" color="teal.700">
                Login realizado com sucesso!
            </Text>
            <Text color="gray.600" textAlign="center">
                Você será redirecionado em breve...
            </Text>
        </VStack>
    );
}
