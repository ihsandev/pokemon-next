import { gql, useQuery } from "@apollo/client";
import { Box, Grid } from "@chakra-ui/react";
import Card from "../../components/Card";
import Layouts from "../../layouts";

const QUERY_POKEMONS = gql`
  query samplePokeAPIquery {
    species: pokemon_v2_pokemonspecies {
      name
      id
      pokemon_v2_pokemoncolor {
        name
      }
    }
    species_aggregate: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const Pokemons = () => {
  const { data, error } = useQuery(QUERY_POKEMONS);
  return (
    <Layouts>
      <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gap="1rem">
        {data &&
          data.species.map((poke: any, index: number) => (
            <Card
              key={index}
              name={poke.name}
              number="001"
              color={poke.pokemon_v2_pokemoncolor.name}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
            />
          ))}
      </Grid>
    </Layouts>
  );
};

export default Pokemons;
