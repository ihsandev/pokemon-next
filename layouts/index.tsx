import { Box } from "@chakra-ui/react";
import Footer from "./partials/Footer";

const Layouts = ({ children, noFooter = false }: any) => {
  return (
    <>
      <Box
        maxWidth={576}
        overflow="hidden"
        margin="0 auto"
        as="main"
        minH="100vh"
        paddingX="0.5rem"
      >
        {children}
      </Box>
      {!noFooter && <Footer />}
    </>
  );
};

export default Layouts;
