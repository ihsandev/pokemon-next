import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import useAppContext from "../../../contexts";
import { QUERY_POKEMONS } from "../../../graphql";
import { addToLocalStorage, getFromLocalStorage } from "../../../utils";
import useActionContainer from "../../hooks/useAction";

export default function useAction() {
  const { removeFromMyList, pushRoute } = useActionContainer();
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
    if (state.generations?.length === 0 && state.types?.length === 0) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_POKEMON_LIST", payload: data });
      dispatch({ type: "SET_TYPES", payload: [] });
      dispatch({ type: "SET_GENERATIONS", payload: [] });
    }
  }, [data]);

  const addToMyList = (data?: any) => {
    const storage = getFromLocalStorage("myPokemons");
    const newData = storage ? [...storage] : [];
    newData.push(data);
    dispatch({ type: "SET_MYPOKEMON", payload: newData });
    addToLocalStorage("myPokemons", newData);
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
