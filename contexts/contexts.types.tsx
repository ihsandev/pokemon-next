export type Action = {
  type:
    | "SET_POKEMON_LIST"
    | "SET_POKEMON_DETAIL"
    | "SET_MYPOKEMON"
    | "SET_LOADING"
    | "SET_TYPES"
    | "SET_GENERATIONS";
  payload: any;
};
export type Dispatch = (action: Action) => void;
export type State = {
  pokemonList?: any;
  pokemonDetail?: any;
  myPokemons?: any;
  loading?: boolean;
  generations?: any[];
  types?: any[];
};
export type AppProviderProps = { children: React.ReactNode };
