import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { PokemonTypeColor } from "../../utils";

interface ICaption {
  name?: string;
  number?: number | string;
  types?: any[];
}

const Caption = ({ number, name, types }: ICaption) => {
  return (
    <Box>
      {number && <Text>#{number}</Text>}
      <Heading fontSize="3xl">{name}</Heading>
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

export default Caption;
