import { Box } from "@chakra-ui/react";

const Layouts = ({ children }: any) => {
  return (
    <Box maxWidth={480} margin="0 auto">
      {children}
    </Box>
  );
};

export default Layouts;
