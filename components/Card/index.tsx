import { Box, Flex, Image, Tooltip } from "@chakra-ui/react";
import Caption from "../Caption";
import { FiBookmark, FiDelete } from "react-icons/fi";

interface ICard {
  name?: string;
  number?: number | string;
  image?: string;
  color?: { solid: string; transparent: string };
  types?: any[];
  onClick?: any;
  onBookmark?: any;
  isBookmark?: boolean;
  onDelete?: any;
}

const Card = ({
  name,
  number,
  image,
  color,
  types,
  onClick,
  onBookmark,
  isBookmark,
  onDelete,
}: ICard) => {
  let newNumber = number;
  const lengthNumber = String(number).length;
  if (lengthNumber === 1) {
    newNumber = `00${number}`;
  } else if (lengthNumber === 2) {
    newNumber = `0${number}`;
  }
  return (
    <Box position="relative">
      {onBookmark && (
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
      )}
      {onDelete && (
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
      )}
      <Box
        borderRadius="1rem"
        padding={6}
        backgroundColor={color?.transparent}
        borderColor={color?.transparent}
        borderWidth="1px"
        cursor={onClick && "pointer"}
        onClick={onClick}
      >
        <Flex justifyContent="center">
          <Image src={image} objectFit="contain" w={125} h={125} />
        </Flex>
        <Caption number={newNumber} name={name} types={types} />
      </Box>
    </Box>
  );
};

export default Card;
