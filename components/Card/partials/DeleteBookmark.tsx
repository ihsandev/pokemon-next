import { Box } from "@chakra-ui/react";
import { FiDelete } from "react-icons/fi";

const DeleteBookmark = ({ onDelete }: any) => {
  return (
    <Box
      position="absolute"
      top="1rem"
      right="1rem"
      cursor="pointer"
      _hover={{ "> svg": { color: "red" } }}
      zIndex={10}
      onClick={onDelete}
    >
      <FiDelete size={35} />
    </Box>
  );
};

export default DeleteBookmark;
