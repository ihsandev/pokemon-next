import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const About = ({ description, pokemons, genderRate, hatchCounter }: any) => {
  return (
    <Box>
      <Box>
        <Heading size="md" mb="0.5rem">
          Description
        </Heading>
        <p>{description}</p>
      </Box>
      <Flex mt="1rem" flexDirection="column" gap="1.5rem">
        <Flex>
          <Text flex={1} fontWeight="semibold" color="gray.500">
            Height
          </Text>
          <Text flex={2}>{pokemons?.height}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight="semibold" color="gray.500">
            Weight
          </Text>
          <Text flex={2}>{pokemons?.weight}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight="semibold" color="gray.500">
            Abilities
          </Text>
          <Text flex={2}>
            {pokemons?.abilities
              ?.map((item: any) => item.ability.name)
              .join(", ")}
          </Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight="semibold" color="gray.500">
            Gender Rate
          </Text>
          <Text flex={2}>{genderRate}</Text>
        </Flex>
        <Flex>
          <Text flex={1} fontWeight="semibold" color="gray.500">
            Hatch Counter
          </Text>
          <Text flex={2}>{hatchCounter}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default About;
