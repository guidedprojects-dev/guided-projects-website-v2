import { ChakraProvider } from "@chakra-ui/react";
import { Provider as AuthProvider } from "next-auth/client";
import theme from "../chakra.theme";

import SiteLayout from "../components/SiteLayout";

import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider session={pageProps.session}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
