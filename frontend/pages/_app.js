// _app.js ou _app.tsx
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <CSSReset />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
