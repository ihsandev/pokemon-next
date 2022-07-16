import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import useAppContext from "../../../contexts";
import { GET_POKEMON_COMPARE } from "../../../graphql";
import { PokemonTypeColor } from "../../../utils";
import useActionContainer from "../../hooks/useAction";

export default function useAction() {
  // const { query } = useRouter();
  const { state, dispatch } = useAppContext();
  const { getCompare } = useActionContainer();
  const { data, loading } = useQuery(GET_POKEMON_COMPARE, {
    variables: {
      first: state.compares[0]?.name,
      second: state.compares[1]?.name,
    },
    ssr: true,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    getCompare();
  }, [data]);

  const firstColor = PokemonTypeColor(
    data?.firstPokemon[0]?.pokemons[0]?.types[0].type?.name
  );

  const secondColor = PokemonTypeColor(
    data?.secondPokemon[0]?.pokemons[0]?.types[0].type?.name
  );

  const color = {
    first: firstColor,
    second: secondColor,
  };

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
  }, [data]);

  return {
    data: state.pokemonDetail,
    color,
    loading,
  };
}
