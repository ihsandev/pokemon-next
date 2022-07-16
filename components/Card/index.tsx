import { Box, Flex, Image } from "@chakra-ui/react";
import Caption from "../Caption";
import CheckboxCompare from "./partials/CheckboxCompare";
import Bookmark from "./partials/Bookmark";
import DeleteBookmark from "./partials/DeleteBookmark";
import useAppContext from "../../contexts";

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
  onCompare?: any;
  isCheckCompare?: boolean;
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
  onCompare,
  isCheckCompare,
}: ICard) => {
  const { state } = useAppContext();
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
        <Bookmark isBookmark={isBookmark} onBookmark={onBookmark} />
      )}
      {onCompare && state.isCompare && (
        <CheckboxCompare
          onCompare={onCompare}
          isCheckCompare={isCheckCompare}
        />
      )}
      {onDelete && <DeleteBookmark onDelete={onDelete} />}
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
