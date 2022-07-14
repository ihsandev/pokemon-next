import { Box } from "@chakra-ui/react";
import Footer from "./partials/Footer";

const Layouts = ({ children }: any) => {
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
      <Footer />
    </>
  );
};

export default Layouts;
