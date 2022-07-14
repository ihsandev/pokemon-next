import { Box, Heading, Image, Text } from "@chakra-ui/react";

interface ICard {
  name?: string;
  number?: number | string;
  image?: string;
  color?: string;
}

const Card = ({ name, number, image, color }: ICard) => {
  let newNumber = number;
  const lengthNumber = String(number).length;
  if (lengthNumber === 1) {
    newNumber = `00${number}`;
  } else if (lengthNumber === 2) {
    newNumber = `0${number}`;
  }
  return (
    <Box
      borderRadius={16}
      padding={6}
      backgroundColor={`${color}.300` || "gray.400"}
      borderColor={`${color}.300` || "gray.400"}
      borderWidth="1px"
      cursor="pointer"
    >
      <Box w={100} h={100}>
        <Image src={image} objectFit="contain" />
      </Box>
      <Text>#{newNumber}</Text>
      <Heading>{name}</Heading>
    </Box>
  );
};

export default Card;
