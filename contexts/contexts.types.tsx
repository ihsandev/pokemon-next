export type Action = {
  type:
    | "SET_POKEMON_LIST"
    | "SET_POKEMON_DETAIL"
    | "SET_MYPOKEMON"
    | "SET_MYPOKEMON_DETAIL"
    | "SET_LOADING";
  payload: any;
};
export type Dispatch = (action: Action) => void;
export type State = {
  pokemonList?: any;
  pokemonDetail?: any;
  myPokemons?: any;
  myPokemonDetail?: any;
  loading?: boolean;
};
export type AppProviderProps = { children: React.ReactNode };
