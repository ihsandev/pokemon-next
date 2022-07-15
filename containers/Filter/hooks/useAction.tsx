import { useQuery } from "@apollo/client";
import useAppContext from "../../../contexts";
import { GET_GENERATIONS, GET_TYPES } from "../../../graphql";
import useActionContainer from "../../hooks/useAction";

export default function useAction() {
  const generations = useQuery(GET_GENERATIONS);
  const { handleFilterSubmit } = useActionContainer();
  const types = useQuery(GET_TYPES);
  const { state, dispatch } = useAppContext();

  const handleFilterCheck = (value: any[], type: string) => {
    if (type === "types") {
      dispatch({ type: "SET_TYPES", payload: value });
    } else {
      dispatch({ type: "SET_GENERATIONS", payload: value });
    }
  };

  return {
    generations,
    types,
    handleFilterCheck,
    state,
    handleFilterSubmit,
  };
}
