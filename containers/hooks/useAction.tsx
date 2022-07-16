import { useRouter } from "next/router";
import { useEffect } from "react";
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

  const addToStorage = (params: any, type: any, name: string) => {
    const storage = getFromLocalStorage(name);
    const newData = storage ? [...storage] : [];
    newData.push(params);
    dispatch({ type, payload: newData });
    addToLocalStorage(name, newData);
  };

  const removeFromStorage = (id: number, type: any, name: string) => {
    const storage = getFromLocalStorage(name);
    if (storage) {
      const newData = storage?.filter(
        (item: any) => String(item.id) !== String(id)
      );
      addToLocalStorage(name, newData);
      dispatch({ type, payload: newData });
    }
  };

  const removeFromMyList = (id: number) => {
    removeFromStorage(id, "SET_MYPOKEMON", "myPokemons");
  };

  const getCompare = () => {
    const storage = getFromLocalStorage("compares");
    if (storage) {
      dispatch({ type: "SET_COMPARES", payload: storage });
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
    addToStorage,
    removeFromStorage,
    getCompare,
  };
}
