import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import urlApi from "../utils/urlApi";
import { useRouter } from "next/router";
import {
  Box,
  Center,
  Spinner,
  Text,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function SuccessPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const configAuth = {
            type: "google",
            contentAuth: {
              email: session.user.email,
            },
          };

          const response = await fetch(urlApi + "/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(configAuth),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.id);
            localStorage.setItem("company", data.companyId);
            setSuccess(true);
            setTimeout(() => router.push("/Dashboard"), 1500);
          } else {
            console.error("Erro ao fazer login:", response.statusText);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
          setIsLoading(false);
        }
      }
    };

    loginWithGoogle();
  }, [session, status]);

  if (status === "loading" || isLoading) {
    return (
      <Center minH="100vh" bg="gray.50" flexDir="column">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text mt={4} fontSize="lg">
          Autenticando...
        </Text>
      </Center>
    );
  }

  if (success) {
    return (
      <Center minH="100vh" bg="green.50">
        <VStack spacing={4}>
          <Icon as={CheckCircleIcon} boxSize={12} color="green.500" />
          <Heading size="lg">Login realizado com sucesso!</Heading>
          <Text fontSize="md">Bem-vindo, {session?.user?.name}</Text>
        </VStack>
      </Center>
    );
  }

  return null;
}
