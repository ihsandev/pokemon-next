import { Box } from "@chakra-ui/react";
import Footer from "./partials/Footer";

const Layouts = ({ children }: any) => {
  return (
    <Box>
      <Box maxWidth={576} overflow="hidden" margin="0 auto" as="main">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layouts;
