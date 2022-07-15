import { useRouter } from "next/router";
import client from "../../configs/apollo-client";
import useAppContext from "../../contexts";
import {
  GET_POKEMON_BY_FILTER_BOTH,
  GET_POKEMON_BY_FILTER_GENERATIONS,
  GET_POKEMON_BY_FILTER_TYPES,
  QUERY_POKEMONS,
} from "../../graphql";
import { addToLocalStorage, getFromLocalStorage } from "../../utils";

export default function useActionContainer() {
  const { push } = useRouter();
  const { state, dispatch } = useAppContext();

  const pushRoute = (url: string) => push(url);

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

  const variables = {
    offset: 0,
    limit: 100,
  };

  const filterByQuery = (query: any, variabless: any) => {
    return client.query({ query, variables: { ...variabless } }).then((res) => {
      dispatch({ type: "SET_POKEMON_LIST", payload: res.data });
    });
  };

  const handleFilterSubmit = () => {
    if (state.generations?.length && state.types?.length) {
      filterByQuery(GET_POKEMON_BY_FILTER_BOTH, {
        ...variables,
        generations: state.generations,
        types: state.types,
      });
    } else if (state.generations?.length) {
      filterByQuery(GET_POKEMON_BY_FILTER_GENERATIONS, {
        ...variables,
        generations: state.generations,
      });
    } else if (state.types?.length) {
      filterByQuery(GET_POKEMON_BY_FILTER_TYPES, {
        ...variables,
        types: state.types,
      });
    } else {
      filterByQuery(QUERY_POKEMONS, {
        ...variables,
      });
    }
    const filter = {
      types: state.types,
      generations: state.generations,
    };
    addToLocalStorage("filter", filter);
    scrollTo({ behavior: "smooth", top: 0 });
  };

  return {
    pushRoute,
    removeFromMyList,
    handleFilterSubmit,
  };
}
