import { Box } from "@chakra-ui/react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const CheckboxCompare = ({ onCompare, isCheckCompare }: any) => {
  return (
    <>
      <Box
        position="absolute"
        top="1rem"
        left="1rem"
        cursor="pointer"
        zIndex={10}
        onClick={onCompare}
      >
        {isCheckCompare ? <FiCheckSquare size={30} /> : <FiSquare size={30} />}
      </Box>
    </>
  );
};

export default CheckboxCompare;
