import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { About, BaseStats, Header } from "../../components";
import { baseImageUrl } from "../../utils";
import useAction from "./hooks/useAction";

const Compare = () => {
  const { data, color } = useAction();
  const firstPokemon = data?.firstPokemon && data?.firstPokemon[0];
  const secondPokemon = data?.secondPokemon && data?.secondPokemon[0];
  const renderImage = (id: number, color: string) => (
    <Flex
      backgroundColor={color}
      flex={1}
      minH="350px"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={`${baseImageUrl}${id}.png`} w={["150px", "200px"]} />
    </Flex>
  );
  const renderDesc = () => (
    <Flex>
      <Box flex={1} borderRightWidth={1} borderColor="gray.100" p="1rem">
        <About
          description={firstPokemon?.description[0]?.text}
          pokemons={firstPokemon?.pokemons[0]}
          genderRate={firstPokemon?.gender_rate}
          hatchCounter={firstPokemon?.hatch_counter}
        />
        <Box mt="1.5rem">
          <Heading size="md">Base Stats</Heading>
          <BaseStats
            stats={firstPokemon?.pokemons[0]?.stats}
            color={color.first}
          />
        </Box>
      </Box>
      <Box flex={1} p="1rem">
        <About
          description={secondPokemon?.description[0]?.text}
          pokemons={secondPokemon?.pokemons[0]}
          genderRate={secondPokemon?.gender_rate}
          hatchCounter={secondPokemon?.hatch_counter}
        />
        <Box mt="1.5rem">
          <Heading size="md">Base Stats</Heading>
          <BaseStats
            stats={secondPokemon?.pokemons[0]?.stats}
            color={color.second}
          />
        </Box>
      </Box>
    </Flex>
  );
  return (
    <>
      <Header backTo="/" />
      <Box maxW={576} margin="0 auto">
        <Flex>
          {renderImage(firstPokemon?.id, color.first.transparent)}
          {renderImage(secondPokemon?.id, color.second.transparent)}
        </Flex>
        {renderDesc()}
      </Box>
    </>
  );
};

export default Compare;
