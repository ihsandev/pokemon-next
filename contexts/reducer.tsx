import { Action, State } from "./contexts.types";

export const initialState = {
  pokemonList: [],
  pokemonDetail: {},
  myPokemons: [],
  loading: false,
  generations: [],
  types: [],
};

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "SET_POKEMON_LIST":
      return {
        ...state,
        pokemonList: action.payload,
      };
    case "SET_POKEMON_DETAIL":
      return {
        ...state,
        pokemonDetail: action.payload,
      };
    case "SET_MYPOKEMON":
      return {
        ...state,
        myPokemons: action.payload,
      };
    case "SET_GENERATIONS":
      return {
        ...state,
        generations: action.payload,
      };
    case "SET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
