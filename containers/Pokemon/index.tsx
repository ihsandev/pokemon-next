import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { CompareView, Header } from "../../components";
import Card from "../../components/Card";
import Layouts from "../../layouts";
import { baseImageUrl, PokemonTypeColor } from "../../utils";
import useAction from "./hooks/useAction";

const Pokemons = () => {
  const {
    data,
    loading,
    pushRoute,
    handleOnBookmark,
    checkIsBookmark,
    checkIsCompare,
    addToCompare,
    removeCompare,
    isCheckCompare,
    compares,
  } = useAction();
  return (
    <Layouts>
      <Header />
      <Box paddingY="4rem">
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
                  onCompare={() => {
                    checkIsCompare(poke.id)
                      ? removeCompare(poke.id)
                      : addToCompare({ id: poke.id, name: poke.name });
                  }}
                  isCheckCompare={checkIsCompare(poke.id)}
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
      {isCheckCompare && <CompareView />}
    </Layouts>
  );
};

export default Pokemons;
