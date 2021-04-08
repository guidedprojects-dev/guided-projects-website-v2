import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra.theme";

import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
