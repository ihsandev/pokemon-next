import { useEffect } from "react";
import useAppContext from "../../../contexts";
import { getFromLocalStorage } from "../../../utils";
import useActionContainer from "../../hooks/useAction";

export default function useAction() {
  const { state, dispatch } = useAppContext();
  const { removeFromMyList, pushRoute } = useActionContainer();

  useEffect(() => {
    const data = getFromLocalStorage("myPokemons");
    if (data) {
      dispatch({ type: "SET_MYPOKEMON", payload: data });
    }
  }, []);

  return {
    data: state.myPokemons,
    removeFromMyList,
    pushRoute,
  };
}
