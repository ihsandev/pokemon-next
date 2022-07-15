import { Action, State } from "./contexts.types";

export const initialState = {
  pokemonList: [],
  pokemonDetail: {},
  myPokemon: [],
  myPokemonDetail: {},
  loading: false,
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
        myPokemon: action.payload,
      };
    case "SET_MYPOKEMON_DETAIL":
      return {
        ...state,
        myPokemonDetail: action.payload,
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
