import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAppContext from "../../../contexts";
import { POKEMON_DETAIL } from "../../../graphql";
import { PokemonTypeColor } from "../../../utils";

export default function useAction() {
  const { query } = useRouter();
  const { state, dispatch } = useAppContext();
  const name = query?.name;
  const { data, loading } = useQuery(POKEMON_DETAIL, {
    variables: {
      name,
    },
    ssr: true,
    notifyOnNetworkStatusChange: true,
  });

  const color = PokemonTypeColor(
    data?.species[0]?.pokemons[0]?.types[0].type?.name
  );

  useEffect(() => {
    if (loading) {
      dispatch({ type: "SET_LOADING", payload: loading });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [loading]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_POKEMON_DETAIL", payload: data });
    }
  }, [data, name]);

  return {
    data: state.pokemonDetail,
    color,
    loading,
  };
}
