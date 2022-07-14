import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppContext from "../../../contexts";

const QUERY_POKEMONS = gql`
  query getPokemon($limit: Int, $offset: Int) {
    species_aggregate: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
    species: pokemon_v2_pokemonspecies(limit: $limit, offset: $offset) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        id
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

export default function useAction() {
  const { push } = useRouter();
  const { state, dispatch } = useAppContext();
  const perPage = 20;
  const [limit, setLimit] = useState(perPage);

  const { data, loading, fetchMore } = useQuery(QUERY_POKEMONS, {
    variables: {
      offset: 0,
      limit,
    },
    ssr: true,
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = () => {
    const element = document.documentElement;
    const size = Math.ceil(window.innerHeight + element.scrollTop);
    if (size === element.offsetHeight && !loading) {
      setLimit(limit + perPage); // load more data
      fetchMore({
        variables: {
          offset: limit,
          limit,
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_POKEMON_LIST", payload: data });
    }
  }, [data]);

  const pushRoute = (url: string) => push(url);

  return {
    data: state.pokemonList,
    loading,
    pushRoute,
  };
}
