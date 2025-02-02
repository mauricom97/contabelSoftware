import { useEffect } from "react";
import { useSession } from "next-auth/react";
import urlApi from "../utils/urlApi";
import { useRouter } from "next/router";

export default function SuccessPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

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
                    const response = await fetch(
                        urlApi + "/user/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(configAuth),
                        },
                    );

                    if (response.ok) {
                        const data = await response.json();
                        // Armazena o token no localStorage
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", data.id);
                        localStorage.setItem("company", data.companyId);
                        console.log(
                            "Token armazenado com sucesso:",
                            data.token,
                        );
                        router.push("/dashboard");

                    } else {
                        console.error(
                            "Erro ao fazer login:",
                            response.statusText,
                        );
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                }
            }
        };

        loginWithGoogle();
    }, [session, status]); // Executa o efeito quando a sessão ou o status mudar

    if (status === "loading") {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Autenticação bem-sucedida!</h1>
            <p>Bem-vindo, {session?.user?.name}</p>
        </div>
    );
}
