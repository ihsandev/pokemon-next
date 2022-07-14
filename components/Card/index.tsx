import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { PokemonTypeColor } from "../../utils";

interface ICard {
  name?: string;
  number?: number | string;
  image?: string;
  color?: { solid: string; transparent: string };
  types?: any[];
}

const Card = ({ name, number, image, color, types }: ICard) => {
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
      cursor="pointer"
    >
      <Box w={100} h={100}>
        <Image src={image} objectFit="contain" />
      </Box>
      <Text>#{newNumber}</Text>
      <Heading>{name}</Heading>

      {types && (
        <Flex gap="0.5rem" mt="1rem">
          {types?.map((type: any, i: number) => (
            <Badge
              key={i}
              bgColor={PokemonTypeColor(type.type.name).solid}
              textColor="white"
            >
              {type.type.name}
            </Badge>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Card;
