import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UseWalletProvider } from "use-wallet";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "@fontsource/space-grotesk";

const theme = extendTheme({
  fonts: {
    heading: "Space Grotesk",
    body: "Space Grotesk",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <UseWalletProvider
          chainId={4}
          connectors={{
            walletconnect: {
              rpcUrl:
                process.env.infura_link,
            },
          }}
        >
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </UseWalletProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
