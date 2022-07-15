import { Box, Grid, Skeleton } from "@chakra-ui/react";
import Card from "../../components/Card";
import Layouts from "../../layouts";
import { baseImageUrl, PokemonTypeColor } from "../../utils";
import useAction from "./hooks/useAction";

const Pokemons = () => {
  const { data, loading, pushRoute, handleOnBookmark, checkIsBookmark } =
    useAction();
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
              const isBookmark = checkIsBookmark(poke.name);
              const color = PokemonTypeColor(
                poke.pokemons[0]?.types[0]?.type?.name
              );
              return (
                <Card
                  key={index}
                  onClick={() => pushRoute(`/list/${poke.name}`)}
                  name={poke.name}
                  number={index + 1}
                  color={color}
                  image={`${baseImageUrl}${poke.id}.png`}
                  types={poke.pokemons[0]?.types}
                  onBookmark={() => handleOnBookmark(poke)}
                  isBookmark={isBookmark}
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
