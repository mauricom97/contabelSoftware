import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Sidebar from "./components/Layouts/Sidebar";
import { useRouter } from "next/router";
import { useEffect } from "react";


function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const pagesWithoutSidebar = [
        "/",
        "/login",
        "/CreateUser",
        "/createcompany",
    ];
    const showSidebar = !pagesWithoutSidebar.includes(router.pathname);


    useEffect(() => {
        if(redirectLogin()) router.push('/login'); 
      }, []);



    return (
        <ChakraProvider>
            {showSidebar ? <Sidebar /> : <></>}
            <CSSReset />
            <Component {...pageProps} />
        </ChakraProvider>
    );
    function redirectLogin() {
        const token = localStorage.getItem('token');
        const pagesWithAuthenticated = [
            "/createcompany",
            "/billstopay",
            "/CreateUser",
            "/dashboard",
            "/entities"
        ];
        const pageWithAuthenticated = pagesWithAuthenticated.includes(router.pathname);
        if(pageWithAuthenticated && !token) return true;
    }
}





export default MyApp;
