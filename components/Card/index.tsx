import { Box, Flex, Image } from "@chakra-ui/react";
import Caption from "../Caption";

interface ICard {
  name?: string;
  number?: number | string;
  image?: string;
  color?: { solid: string; transparent: string };
  types?: any[];
  onClick?: any;
}

const Card = ({ name, number, image, color, types, onClick }: ICard) => {
  let newNumber = number;
  const lengthNumber = String(number).length;
  if (lengthNumber === 1) {
    newNumber = `00${number}`;
  } else if (lengthNumber === 2) {
    newNumber = `0${number}`;
  }
  return (
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
  );
};

export default Card;
