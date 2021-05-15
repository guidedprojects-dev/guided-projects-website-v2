import { ChakraProvider } from "@chakra-ui/react";
import { Provider as AuthProvider } from "next-auth/client";
import theme from "../chakra.theme";

import SiteLayout from "../components/SiteLayout";

import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  // Conditionally render layout based on the component that we are rendering.
  // For more information about this, check out https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const Layout = Component.layout || SiteLayout;
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
