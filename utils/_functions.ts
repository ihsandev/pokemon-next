export const PokemonTypeColor = (pokemonType: string) => {
  switch (pokemonType) {
    case "grass":
      return {
        solid: "green.400",
        transparent: "green.200",
      };

    case "fire":
      return {
        solid: "red.400",
        transparent: "red.200",
      };

    case "water":
      return {
        solid: "blue.400",
        transparent: "blue.200",
      };

    case "electric":
      return {
        solid: "orange.400",
        transparent: "orange.200",
      };

    case "ice":
      return {
        solid: "cyan.400",
        transparent: "cyan.200",
      };

    case "psychic":
      return {
        solid: "yellow.400",
        transparent: "yellow.200",
      };

    case "flying":
      return {
        solid: "blue.700",
        transparent: "blue.300",
      };

    case "poison":
      return {
        solid: "purple.400",
        transparent: "purple.200",
      };

    case "bug":
      return {
        solid: "red.700",
        transparent: "green.300",
      };

    case "ground":
      return {
        solid: "gray.700",
        transparent: "gray.300",
      };

    case "fairy":
      return {
        solid: "pink.400",
        transparent: "pink.200",
      };

    case "fighting":
      return {
        solid: "green.400",
        transparent: "green.200",
      };

    case "rock":
      return {
        solid: "yellow.800",
        transparent: "yellow.400",
      };

    default:
      return {
        solid: "gray.800",
        transparent: "green.400",
      };
  }
};

export const addToLocalStorage = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStorage = (name: string) => {
  const newData: any = localStorage.getItem(name);
  function isJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return str;
    }
    return JSON.parse(str);
  }
  return isJsonString(newData);
};
