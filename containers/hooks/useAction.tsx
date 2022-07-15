import { useRouter } from "next/router";
import useAppContext from "../../contexts";
import { addToLocalStorage, getFromLocalStorage } from "../../utils";

export default function useActionContainer() {
  const { push } = useRouter();
  const { dispatch } = useAppContext();

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

  return {
    pushRoute,
    removeFromMyList,
  };
}
