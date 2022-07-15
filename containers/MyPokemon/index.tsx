import { Box, Flex, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layouts from "../../layouts";
import { baseImageUrl, PokemonTypeColor } from "../../utils";
import useAction from "./hooks/useAction";

const MyPokemons = () => {
  const { data } = useAction();
  const { push } = useRouter();
  console.log(data);
  return (
    <Layouts>
      <Box paddingY="1.5rem">
        {data?.length ? (
          <Grid
            gridTemplateColumns={["1fr", "1fr 1fr"]}
            gap="1rem"
            justifyContent="space-between"
          >
            {data?.map((poke: any, index: number) => {
              const color = PokemonTypeColor(
                poke.pokemons[0]?.types[0]?.type?.name
              );
              return (
                <Card
                  key={index}
                  onClick={() => push(`/my-list/${poke.name}`)}
                  name={poke.name}
                  number={index + 1}
                  color={color}
                  image={`${baseImageUrl}${poke.id}.png`}
                  types={poke.pokemons[0]?.types}
                />
              );
            })}
          </Grid>
        ) : (
          <Flex
            minHeight="80vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="gray.500"
          >
            <Heading mb="1rem" fontSize="7xl">
              Opps!
            </Heading>
            <Heading>Data Not Found</Heading>
          </Flex>
        )}
      </Box>
    </Layouts>
  );
};

export default MyPokemons;
