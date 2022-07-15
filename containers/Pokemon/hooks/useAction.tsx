import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppContext from "../../../contexts";
import { addToLocalStorage, getFromLocalStorage } from "../../../utils";

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
  const { push, query } = useRouter();
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

  const addToMyList = (data?: any) => {
    const storage = getFromLocalStorage("myPokemons");
    const newData = storage ? [...storage] : [];
    newData.push(data);
    dispatch({ type: "SET_MYPOKEMON", payload: newData });
    addToLocalStorage("myPokemons", newData);
  };

  const removeFromMyList = (id: number) => {
    const storage = getFromLocalStorage("myPokemons");
    if (storage) {
      const newData = storage?.filter(
        (item: any) => String(item.id) !== String(id)
      );
      addToLocalStorage("myPokemons", newData);
      dispatch({ type: "SET_MYPOKEMON", payload: newData });
    }
  };

  const getDataMyList = () => {
    const storage = getFromLocalStorage("myPokemons");
    if (storage) {
      dispatch({ type: "SET_MYPOKEMON", payload: storage });
    }
  };

  useEffect(() => {
    getDataMyList();
  }, []);

  const handleOnBookmark = (poke: any) => {
    if (checkIsBookmark(poke.name)) {
      return removeFromMyList(poke.id);
    }
    return addToMyList(poke);
  };

  const checkIsBookmark = (name: string) => {
    let result = false;
    if (typeof window !== "undefined") {
      const storage = getFromLocalStorage("myPokemons");
      if (storage) {
        result = storage?.some(
          (item: any) => String(item["name"]) === String(name)
        );
      }
    }
    return result;
  };

  return {
    data: state.pokemonList,
    loading,
    handleOnBookmark,
    pushRoute,
    checkIsBookmark,
  };
}
