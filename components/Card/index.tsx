import { Box, Heading, Image, Text } from "@chakra-ui/react";

interface ICard {
  name?: string;
  number?: number | string;
  image?: string;
  color?: string;
}

const Card = ({ name, number, image, color }: ICard) => {
  return (
    <Box
      borderRadius={10}
      padding={6}
      backgroundColor={`${color}.300` || "gray.400"}
      borderColor={`${color}.300` || "gray.400"}
      borderWidth="1px"
      cursor="pointer"
    >
      <Box w={100} h={100}>
        <Image src={image} objectFit="contain" />
      </Box>
      <Text>#{number}</Text>
      <Heading>{name}</Heading>
    </Box>
  );
};

export default Card;
