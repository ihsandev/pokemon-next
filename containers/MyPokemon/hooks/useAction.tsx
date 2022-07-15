import { useEffect } from "react";
import useAppContext from "../../../contexts";
import { getFromLocalStorage } from "../../../utils";

export default function useAction() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const data = getFromLocalStorage("myPokemons");
    if (data) {
      dispatch({ type: "SET_MYPOKEMON", payload: data });
    }
  }, []);

  return {
    data: state.myPokemons,
  };
}
