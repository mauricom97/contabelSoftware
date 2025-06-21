import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react"; // Importe Box
import Sidebar from "./components/Layouts/Sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    const pagesWithoutSidebar = [
        "/",
        "/Login",
        "/CreateUser",
        "/CreateCompany",
        "/SucessLogin",
        "/RecoveryPassword",
    ];
    const showSidebar =
        !pagesWithoutSidebar.includes(router.pathname);

    useEffect(() => {
        if (redirectLogin()) router.push("/Login");
    }, []);

    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                {showSidebar ? <Sidebar /> : <></>}
                <CSSReset />
                {/* Adicione um Box para o conteúdo principal */}
                <Box
                    ml={{ base: 0, sm: showSidebar ? "300px" : 0 }} // Adiciona margin-left de 300px (largura do sidebar) em telas sm e maiores, se o sidebar estiver visível
                    transition="margin-left 0.5s ease-in-out" // Adiciona uma transição suave
                >
                    <Component {...pageProps} />
                </Box>
            </ChakraProvider>
        </SessionProvider>
    );
    function redirectLogin() {
        const token = localStorage.getItem("token");
        const pagesWithAuthenticated = [
            "/CreateCompany",
            "/BillsToPay",
            "/CreateUser",
            "/Dashboard",
            "/Entities",
        ];
        const pageWithAuthenticated = pagesWithAuthenticated.includes(
            router.pathname,
        );
        if (pageWithAuthenticated && !token) return true;
    }
}

export default MyApp;
