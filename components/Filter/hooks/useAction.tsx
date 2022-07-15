import { useQuery } from "@apollo/client";
import client from "../../../configs/apollo-client";
import useAppContext from "../../../contexts";
import {
  GET_GENERATIONS,
  GET_POKEMON_BY_FILTER_BOTH,
  GET_POKEMON_BY_FILTER_GENERATIONS,
  GET_POKEMON_BY_FILTER_TYPES,
  GET_TYPES,
} from "../../../graphql";

export default function useAction() {
  const generations = useQuery(GET_GENERATIONS);
  const types = useQuery(GET_TYPES);
  const { state, dispatch } = useAppContext();
  const variables = {
    offset: 0,
    limit: 100,
  };

  const filterByQuery = (query: any, variabless: any) => {
    return client.query({ query, variables: { ...variabless } }).then((res) => {
      dispatch({ type: "SET_POKEMON_LIST", payload: res.data });
    });
  };

  const handleFilterCheck = (value: any[], type: string) => {
    if (type === "types") {
      dispatch({ type: "SET_TYPES", payload: value });
    } else {
      dispatch({ type: "SET_GENERATIONS", payload: value });
    }
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
      location.reload();
    }
  };

  return {
    generations,
    types,
    handleFilterCheck,
    handleFilterSubmit,
    state,
  };
}
