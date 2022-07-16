import { gql } from "@apollo/client";

export const QUERY_POKEMONS = gql`
  query getPokemon($limit: Int, $offset: Int) {
    species_aggregate: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
    species: pokemon_v2_pokemonspecies(limit: $limit, offset: $offset) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        id
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

export const POKEMON_DETAIL = gql`
  query getDetailPokemon($name: [String!]) {
    species: pokemon_v2_pokemonspecies(
      where: { name: { _in: $name } }
      limit: 1
    ) {
      id
      gender_rate
      hatch_counter
      name
      description: pokemon_v2_pokemonspeciesflavortexts(
        limit: 1
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
      ) {
        text: flavor_text
      }
      evolutions: pokemon_v2_evolutionchain {
        species: pokemon_v2_pokemonspecies(order_by: { order: asc }) {
          id
          name
          evolves_from_species_id
          evolutions: pokemon_v2_pokemonevolutions {
            min_level
            min_affection
            min_beauty
            min_happiness
            gender_id
            time_of_day
            move: pokemon_v2_move {
              name
            }
            by_held_item: pokemonV2ItemByHeldItemId {
              name
            }
            item: pokemon_v2_item {
              name
            }
            evolution_trigger: pokemon_v2_evolutiontrigger {
              name
            }
            location: pokemon_v2_location {
              name
            }
          }
        }
      }
      egg_groups: pokemon_v2_pokemonegggroups {
        group: pokemon_v2_egggroup {
          name
        }
      }
      pokemons: pokemon_v2_pokemons {
        id
        name
        height
        weight
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
        stats: pokemon_v2_pokemonstats {
          base_stat
          stat: pokemon_v2_stat {
            name
          }
        }
      }
    }
    species_aggregate: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_TYPES = gql`
  query getPokemonTypes {
    types: pokemon_v2_type {
      id
      name
    }
  }
`;

export const GET_GENERATIONS = gql`
  query getPokemonGenerations {
    generations: pokemon_v2_generation {
      id
      name
    }
  }
`;

export const GET_POKEMON_BY_FILTER_BOTH = gql`
  query getPokemonBoth(
    $limit: Int
    $offset: Int
    $generations: [String!]
    $types: [String!]
  ) {
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: {
        pokemon_v2_generation: { name: { _in: $generations } }
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: { name: { _in: $types } }
          }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    species: pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: {
        pokemon_v2_generation: { name: { _in: $generations } }
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: { name: { _in: $types } }
          }
        }
      }
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        id
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_FILTER_TYPES = gql`
  query getPokemonByType($limit: Int, $offset: Int, $types: [String!]) {
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: {
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: { name: { _in: $types } }
          }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    species: pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: {
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: { name: { _in: $types } }
          }
        }
      }
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        id
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_FILTER_GENERATIONS = gql`
  query getPokemonByGen($limit: Int, $offset: Int, $generations: [String!]) {
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: { pokemon_v2_generation: { name: { _in: $generations } } }
    ) {
      aggregate {
        count
      }
    }
    species: pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: { pokemon_v2_generation: { name: { _in: $generations } } }
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        id
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

const compareResQuery = `
  id
  gender_rate
  hatch_counter
  name
  description: pokemon_v2_pokemonspeciesflavortexts(
    limit: 1
    where: { pokemon_v2_language: { name: { _eq: "en" } } }
  ) {
    text: flavor_text
  }
  evolutions: pokemon_v2_evolutionchain {
    species: pokemon_v2_pokemonspecies(order_by: { order: asc }) {
      id
      name
      evolves_from_species_id
      evolutions: pokemon_v2_pokemonevolutions {
        min_level
        min_affection
        min_beauty
        min_happiness
        gender_id
        time_of_day
        move: pokemon_v2_move {
          name
        }
        by_held_item: pokemonV2ItemByHeldItemId {
          name
        }
        item: pokemon_v2_item {
          name
        }
        evolution_trigger: pokemon_v2_evolutiontrigger {
          name
        }
        location: pokemon_v2_location {
          name
        }
      }
    }
  }
  pokemons: pokemon_v2_pokemons {
    id
    name
    height
    weight
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
      }
    }
    abilities: pokemon_v2_pokemonabilities {
      ability: pokemon_v2_ability {
        name
      }
    }
    stats: pokemon_v2_pokemonstats {
      base_stat
      stat: pokemon_v2_stat {
        name
      }
    }
  }
`;

export const GET_POKEMON_COMPARE = gql`
  query getPokemon($first: String, $second: String) {
    firstPokemon: pokemon_v2_pokemonspecies(
      where: { name: { _eq: $first } }
      limit: 1
    ) {
      ${compareResQuery}
    }

    secondPokemon: pokemon_v2_pokemonspecies(
      where: { name: { _eq: $second } }
      limit: 1
    ) {
      ${compareResQuery}
    }
  }
`;
