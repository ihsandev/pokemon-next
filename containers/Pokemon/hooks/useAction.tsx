import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import useAppContext from "../../../contexts";
import { QUERY_POKEMONS } from "../../../graphql";
import { getFromLocalStorage } from "../../../utils";
import useActionContainer from "../../hooks/useAction";

export default function useAction() {
  const {
    removeFromMyList,
    pushRoute,
    handleFilterSubmit,
    removeFromStorage,
    addToStorage,
    getCompare,
  } = useActionContainer();
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
    if (state.generations?.length === 0 && state.types?.length === 0 && data) {
      dispatch({ type: "SET_POKEMON_LIST", payload: data });
      dispatch({ type: "SET_TYPES", payload: [] });
      dispatch({ type: "SET_GENERATIONS", payload: [] });
    }
  }, [data]);

  const addToMyList = (data?: any) => {
    addToStorage(data, "SET_MYPOKEMON", "myPokemons");
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

  useEffect(() => {
    getCompare();
    if (state.compares?.length > 0) {
      dispatch({ type: "SET_ISCOMPARE", payload: true });
    }
  }, [data]);

  const handleOnBookmark = (poke: any) => {
    if (checkIsBookmark(poke.name)) {
      return removeFromMyList(poke.id);
    }
    return addToMyList(poke);
  };

  const getFilter = () => {
    const storage = getFromLocalStorage("filter");
    if (storage) {
      dispatch({ type: "SET_GENERATIONS", payload: storage.generations });
      dispatch({ type: "SET_TYPES", payload: storage.types });
    }
  };

  useEffect(() => {
    getFilter();
    if (state.generations?.length || state.types?.length) {
      handleFilterSubmit();
    }
  }, [data]);

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

  const checkIsCompare = (id: string) => {
    let result = false;
    if (typeof window !== "undefined") {
      const storage = getFromLocalStorage("compares");
      result = storage?.some((item: any) => String(item["id"]) === String(id));
    }
    return result;
  };

  const addToCompare = (params: any) => {
    if (state.compares.length < 2) {
      addToStorage(params, "SET_COMPARES", "compares");
    }
  };

  const removeCompare = (idPoke: number) => {
    if (state.compares.length < 3) {
      removeFromStorage(idPoke, "SET_COMPARES", "compares");
    }
  };

  const isCheckCompare = state.compares.length > 0;

  return {
    data: state.pokemonList,
    loading,
    handleOnBookmark,
    pushRoute,
    checkIsBookmark,
    checkIsCompare,
    addToCompare,
    removeCompare,
    isCheckCompare,
    compares: state.compares,
  };
}
