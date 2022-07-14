import { Box, Grid, Skeleton } from "@chakra-ui/react";
import Card from "../../components/Card";
import Layouts from "../../layouts";
import { PokemonTypeColor } from "../../utils";
import useAction from "./hooks/useAction";

const Pokemons = () => {
  const { data, loading } = useAction();
  return (
    <Layouts>
      <Box paddingY="1.5rem">
        <Grid
          gridTemplateColumns={["1fr", "1fr 1fr"]}
          gap="1rem"
          justifyContent="space-between"
        >
          {data?.species?.length ? (
            data?.species?.map((poke: any, index: number) => {
              const color = PokemonTypeColor(
                poke.pokemons[0]?.types[0]?.type?.name
              );
              return (
                <Card
                  key={index}
                  name={poke.name}
                  number={index + 1}
                  color={color}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                  types={poke.pokemons[0]?.types}
                />
              );
            })
          ) : (
            <>
              {[...new Array(6)].map((_, i) => (
                <Skeleton key={i} w="auto" h={250} borderRadius="1rem" />
              ))}
            </>
          )}
          {loading && (
            <>
              {[...new Array(2)].map((_, i) => (
                <Skeleton key={i} w="auto" h={250} borderRadius="1rem" />
              ))}
            </>
          )}
        </Grid>
      </Box>
    </Layouts>
  );
};

export default Pokemons;
