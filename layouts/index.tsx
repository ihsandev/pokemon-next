import { Box } from "@chakra-ui/react";
import Loading from "../components/Loading";
import useAppContext from "../contexts";
import Footer from "./partials/Footer";

const Layouts = ({ children, noFooter = false }: any) => {
  const { state } = useAppContext();
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
      <Loading show={state.loading} />
    </>
  );
};

export default Layouts;
