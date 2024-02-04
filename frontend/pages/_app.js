import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Sidebar from "./components/Layouts/Sidebar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const pagesWithoutSidebar = [
        "/",
        "/login",
        "/CreateUser",
        "/createcompany",
    ];
    const showSidebar = !pagesWithoutSidebar.includes(router.pathname);

    return (
        <ChakraProvider>
            {showSidebar ? <Sidebar /> : <></>}
            <CSSReset />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
