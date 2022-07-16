import { Box, Tooltip } from "@chakra-ui/react";
import { FiBookmark } from "react-icons/fi";

const Bookmark = ({ onBookmark, isBookmark }: any) => {
  return (
    <Tooltip
      hasArrow
      label={isBookmark ? "Remove From My List" : "Add To My List"}
      bg="gray.800"
      color="gray.100"
    >
      <Box
        position="absolute"
        top="1rem"
        right="1rem"
        cursor="pointer"
        zIndex={10}
        onClick={onBookmark}
      >
        <FiBookmark size={35} fill={isBookmark ? "gray.800" : "none"} />
      </Box>
    </Tooltip>
  );
};

export default Bookmark;
