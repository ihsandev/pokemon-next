import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "../configs/apollo-client";
import { AppContextProvider } from "../contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
